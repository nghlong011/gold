import { Container } from "react-bootstrap";
import Link from "next/link";
interface BreadcrumbProps {
  items: string[];
}

const Breadcrumb = ({ items }: BreadcrumbProps) => {
  const breadcrumbItems = ["Home", ...items];

  return (
    <Container fluid className="breadcrumb-container bg-[#f7f7f7] py-3">
      <Container>
        <div className="breadcrumb text-xs">
          {breadcrumbItems.map((item, index) => (
            <span key={index}>
              <Link href={`/${item.toLowerCase()}`}>{item}</Link>
              {index < breadcrumbItems.length - 1 && " > "}
            </span>
          ))}
        </div>
        <h1 className="text-3xl font-bold">
          {breadcrumbItems[breadcrumbItems.length - 1]}
        </h1>
      </Container>
    </Container>
  );
};

export default Breadcrumb;
