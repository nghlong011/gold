"use client";
import { Container, Table, Button, Image } from "react-bootstrap";
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
    const { name, value } = e.target;
    setNewNews((prev) => ({ ...prev, [name]: value }));
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
    </Container>
  );
};

export default AdminAnalysisPage;
