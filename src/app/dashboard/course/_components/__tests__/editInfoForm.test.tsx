import { render, screen, } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { EditInfoForm } from "../editInfoForm";

const mockData = {
  id: 1,
  title: "React Course",
  price: 99.99,
  rating: { rate: 4.5, count: 100 },
  description: "Learn React fundamentals",
  image: "/react-course.jpg",
  category: "Frontend",
};

describe("EditInfoForm Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve renderizar o formulário com os dados iniciais", () => {
    render(<EditInfoForm data={mockData} />);

    expect(screen.getByDisplayValue("React Course")).toBeInTheDocument();
    expect(screen.getByDisplayValue("99.99")).toBeInTheDocument();
    expect(
      screen.getByDisplayValue("Learn React fundamentals")
    ).toBeInTheDocument();
    expect(screen.getByDisplayValue("/react-course.jpg")).toBeInTheDocument();
  });

  it("deve desabilitar o campo de categoria", () => {
    render(<EditInfoForm data={mockData} />);

    const categorySelect = screen.getByLabelText("Categoria");
    expect(categorySelect).toBeDisabled();
  });

  it("deve mostrar preview da imagem quando URL é válida", async () => {
    render(<EditInfoForm data={mockData} />);

    const imageInput = screen.getByLabelText("URL da Imagem");
    const newImageUrl = "/new-image.jpg";

    await userEvent.clear(imageInput);
    await userEvent.type(imageInput, newImageUrl);

    const imagePreview = screen.getByAltText("Prévia da imagem");
    expect(imagePreview.getAttribute("src")).toContain(encodeURIComponent(newImageUrl));
  });

});
