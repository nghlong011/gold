"use client";
import { Container, Table, Button, Image, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import dynamic from "next/dynamic";

// Import động AddNewsForm với SSR bị vô hiệu hóa
const AddNewsForm = dynamic(() => import("@/components/AddNewsForm"), {
  ssr: false,
});

interface NewsItem {
  id: number;
  title: string;
  description: string;
  imageurl: string;
  time: string;
  author: string;
}
const AdminAnalysisPage = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newNews, setNewNews] = useState<Partial<NewsItem>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const fetchNews = async () => {
    try {
      const response = await axios.get<NewsItem[]>(
        "https://kiemtiencungsammy.click/api/analysis.php"
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
    const { name, value, files } = e.target;
    if (name === "image" && files && files[0]) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewNews((prevNews) => ({
          ...prevNews,
          imageurl: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setNewNews((prevNews) => ({
        ...prevNews,
        [name]: value,
      }));
    }
  };

  const handleDescriptionChange = (_event: any, editor: ClassicEditor) => {
    try {
      const data = editor.getData();
      setNewNews((prev) => ({ ...prev, description: data }));
    } catch (error) {
      console.error("Error updating description:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      // Upload the image file if it exists
      let imageUrl = newNews.imageurl ?? "";
      if (newNews.imageurl && newNews.imageurl.startsWith("data:")) {
        const formData = new FormData();
        const blob = await fetch(newNews.imageurl).then((res) => res.blob());
        formData.append("upload", blob, "image.png");
        const uploadResponse = await axios.post(
          "https://kiemtiencungsammy.click/api/upload.php",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (uploadResponse.data && uploadResponse.data.url) {
          imageUrl = uploadResponse.data.url;
        } else {
          throw new Error("Failed to upload image");
        }
      }

      // Prepare the data to be sent
      const data = {
        title: newNews.title ?? "",
        author: newNews.author ?? "",
        imageurl: imageUrl,
        description: newNews.description ?? "",
        time: new Date().toISOString(),
      };

      // Log the data to console
      console.log("Submitting data:", data);

      // Make the POST request
      const response = await axios.post(
        "https://kiemtiencungsammy.click/api/analysis.php",
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

  const handleDelete = async () => {
    if (deleteId === null) return;

    try {
      const response = await axios.delete(
        `https://kiemtiencungsammy.click/api/analysis.php`,
        {
          data: { id: deleteId },
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.message) {
        console.log("News item deleted successfully:", response.data);
        fetchNews();
      } else {
        console.error("Failed to delete news item:", response.data.message);
      }
    } catch (error) {
      console.error("Error deleting news item:", error);
    } finally {
      setShowConfirmModal(false);
      setDeleteId(null);
    }
  };

  const confirmDelete = (id: number) => {
    setDeleteId(id);
    setShowConfirmModal(true);
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-3">Admin Analysis Management</h2>
      <Button variant="primary" className="mb-3" onClick={handleAdd}>
        Add Analysis
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
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => confirmDelete(item.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <AddNewsForm
        showModal={showModal}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        handleInputChange={handleInputChange}
        handleDescriptionChange={handleDescriptionChange}
        newNews={newNews}
        isLoading={isLoading}
        error={error}
      />

      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this item?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowConfirmModal(false)}
          >
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AdminAnalysisPage;
