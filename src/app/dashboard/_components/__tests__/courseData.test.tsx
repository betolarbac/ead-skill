import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CourseData from "../courseData/courseData";
import { columnsData } from "../courseData/columnsData";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

const mockRouter = {
  push: jest.fn(),
  back: jest.fn(),
  forward: jest.fn(),
  refresh: jest.fn(),
  replace: jest.fn(),
  prefetch: jest.fn(),
};

const mockData = [{
  id: 1,
  title: "React Fundamentals",
  price: 99.99,
  rating: { rate: 4.5, count: 100 },
  description: "Learn React from scratch",
  image: "/react-course.jpg",
  category: "Frontend",
}, {
  id: 2,
  title: "Node.js Advanced",
  price: 149.99,
  rating: { rate: 4.8, count: 80 },
  description: "Advanced Node.js concepts",
  image: "/nodejs-course.jpg",
  category: "Backend",
}];

describe("CourseData Component", () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("deve renderizar a tabela com os dados corretamente", () => {
    render(<CourseData columns={columnsData} data={mockData} />);

    expect(screen.getByText("React Fundamentals")).toBeInTheDocument();
    expect(screen.getByText("Node.js Advanced")).toBeInTheDocument();
  });

  it("deve filtrar cursos por título", async () => {
    render(<CourseData columns={columnsData} data={mockData} />);

    const searchInput = screen.getByPlaceholderText("Buscar Curso...");
    await userEvent.type(searchInput, "React");

    expect(screen.getByText("React Fundamentals")).toBeInTheDocument();
    expect(screen.queryByText("Node.js Advanced")).not.toBeInTheDocument();
  });

  it("deve ordenar cursos por preço", async () => {
    render(<CourseData columns={columnsData} data={mockData} />);

    const priceHeader = screen.getByText("Preço");
    await userEvent.click(priceHeader);

    const prices = screen
      .getAllByText(/R\$/)
      .map((element) =>
        parseFloat(
          element.textContent?.replace("R$", "").replace(",", ".").trim() || "0"
        )
      );

    expect(prices[0]).toBeLessThan(prices[1]);
  });

  it("deve exibir mensagem quando nenhum curso é encontrado", async () => {
    render(<CourseData columns={columnsData} data={mockData} />);

    const searchInput = screen.getByPlaceholderText("Buscar Curso...");
    await userEvent.type(searchInput, "Curso Inexistente");

    expect(screen.getByText("Sem Cursos Encontrados")).toBeInTheDocument();
  });

  it("deve funcionar a paginação", async () => {
    const manyMockData = Array.from({ length: 6 }, (_, index) => ({
      ...mockData[0],
      id: index + 1,
      title: `Course ${index + 1}`,
    }));

    render(<CourseData columns={columnsData} data={manyMockData} />);

    // Verificar se mostra apenas 5 itens por página
    expect(screen.getAllByText(/Course \d/).length).toBe(5);

    // Ir para próxima página
    const nextButton = screen.getByText("Next");
    await userEvent.click(nextButton);

    // Verificar se mostra o último item
    expect(screen.getByText("Course 6")).toBeInTheDocument();
  });
});
