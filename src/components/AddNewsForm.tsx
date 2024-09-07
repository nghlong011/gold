"use client";
import React, { useEffect, useState } from "react";
import { Form, Button, Modal, Alert } from "react-bootstrap";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

interface NewsItem {
  id: number;
  title: string;
  description: string;
  imageurl: string;
  time: string;
  author: string;
}

interface AddNewsFormProps {
  showModal: boolean;
  handleClose: () => void;
  handleSubmit: (e: React.FormEvent) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDescriptionChange: (_event: any, editor: ClassicEditor) => void;
  newNews: Partial<NewsItem>;
  isLoading: boolean;
  error: string | null;
}

const AddNewsForm: React.FC<AddNewsFormProps> = ({
  showModal,
  handleClose,
  handleSubmit,
  handleInputChange,
  handleDescriptionChange,
  newNews,
  isLoading,
  error,
}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // hoặc một spinner loading, hoặc một placeholder khác
  }

  return (
    <Modal show={showModal} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Add New News</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={newNews.title ?? ""}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Author</Form.Label>
            <Form.Control
              type="text"
              name="author"
              value={newNews.author ?? ""}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              type="text"
              name="imageurl"
              value={newNews.imageurl ?? ""}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <CKEditor
              editor={ClassicEditor}
              data={newNews.description ?? ""}
              onChange={handleDescriptionChange}
              config={{
                extraPlugins: [MyCustomUploadAdapterPlugin],
              }}
              onReady={(editor) => {
                editor.editing.view.change((writer) => {
                  const root = editor.editing.view.document.getRoot();
                  if (root) {
                    writer.setStyle("min-height", "200px", root);
                  }
                });
              }}
            />
          </Form.Group>
          {error && <Alert variant="danger">{error}</Alert>}
          <Button variant="primary" type="submit" disabled={isLoading}>
            {isLoading ? "Submitting..." : "Submit"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

function MyCustomUploadAdapterPlugin(editor: any) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader: any) => {
    return new MyUploadAdapter(loader);
  };
}

class MyUploadAdapter {
  loader: any;
  xhr!: XMLHttpRequest;

  constructor(loader: any) {
    this.loader = loader;
  }

  upload() {
    return this.loader.file.then(
      (file: File) =>
        new Promise((resolve, reject) => {
          this._initRequest();
          this._initListeners(resolve, reject, file);
          this._sendRequest(file);
        })
    );
  }

  abort() {
    if (this.xhr) {
      this.xhr.abort();
    }
  }

  _initRequest() {
    const xhr = (this.xhr = new XMLHttpRequest());
    xhr.open("POST", "https://kiemtiencungsammy.click/api/upload.php", true);
    xhr.responseType = "json";
  }

  _initListeners(resolve: any, reject: any, file: File) {
    const xhr = this.xhr;
    const loader = this.loader;
    const genericErrorText = `Couldn't upload file: ${file.name}.`;

    xhr.addEventListener("error", () => reject(genericErrorText));
    xhr.addEventListener("abort", () => reject());
    xhr.addEventListener("load", () => {
      const response = xhr.response;

      if (!response || response.error) {
        return reject(
          response && response.error ? response.error.message : genericErrorText
        );
      }

      resolve({
        default: response.url,
      });
    });

    if (xhr.upload) {
      xhr.upload.addEventListener("progress", (evt) => {
        if (evt.lengthComputable) {
          loader.uploadTotal = evt.total;
          loader.uploaded = evt.loaded;
        }
      });
    }
  }

  _sendRequest(file: File) {
    const data = new FormData();
    data.append("upload", file);
    this.xhr.send(data);
  }
}

export default AddNewsForm;
