"use client";
import {
  Container,
  Table,
  Button,
  Image,
  Modal,
  Form,
  Alert,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
// import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

interface NewsItem {
  id: number;
  title: string;
  description: string;
  imageurl: string;
  time: string;
  author: string;
}

const AdminNewsPage = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newNews, setNewNews] = useState<Partial<NewsItem>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNews = async () => {
    try {
      const response = await axios.get<NewsItem[]>(
        "https://kiemtiencungsammy.click/api/news.php"
      );
      setNews(response.data);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleAdd = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setNewNews({});
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewNews((prev) => ({ ...prev, [name]: value }));
  };

  const handleDescriptionChange = (_event: any, editor: ClassicEditor) => {
    try {
      const data = editor.getData();
      setNewNews((prev) => ({ ...prev, description: data }));
    } catch (error) {
      console.error("Error updating description:", error); // Ghi log lỗi nếu có
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      // Prepare the data to be sent
      const data = {
        title: newNews.title ?? "",
        author: newNews.author ?? "",
        imageurl: newNews.imageurl ?? "",
        description: newNews.description ?? "",
        time: new Date().toISOString(),
      };

      // Log the data to console
      console.log("Submitting data:", data);

      // Make the POST request
      const response = await axios.post(
        "https://kiemtiencungsammy.click/api/news.php",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.message) {
        console.log("News item added successfully:", response.data);
        // Close the modal
        handleClose();
        // Refresh the news list
        fetchNews();
      } else {
        console.error("Failed to add news item:", response.data.message);
        // Optionally, show an error message to the user
      }
    } catch (error) {
      console.error("Error adding news item:", error);
      setError("Failed to add news item. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-3">Admin News Management</h2>
      <Button variant="primary" className="mb-3" onClick={handleAdd}>
        Add News
      </Button>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Time</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {news.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.author}</td>
              <td>{item.time}</td>
              <td>
                <Image
                  src={item.imageurl}
                  alt={item.title}
                  style={{ width: "50px", height: "50px", objectFit: "cover" }}
                />
              </td>
              <td>
                <Button variant="info" size="sm" className="me-2">
                  Edit
                </Button>
                <Button variant="danger" size="sm">
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

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
            {/* <Form.Group className="mb-3">
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
            </Form.Group> */}
            {error && <Alert variant="danger">{error}</Alert>}
            <Button variant="primary" type="submit" disabled={isLoading}>
              {isLoading ? "Submitting..." : "Submit"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

function MyCustomUploadAdapterPlugin(editor: any) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader: any) => {
    return new MyUploadAdapter(loader);
  };
}

class MyUploadAdapter {
  loader: any;
  xhr!: XMLHttpRequest; // Use definite assignment assertion

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

export default AdminNewsPage;
