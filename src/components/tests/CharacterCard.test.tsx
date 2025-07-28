import { render, screen } from "@testing-library/react";
import { EntityCard } from "../EntityCard";

describe("EntityCard", () => {
  const baseEntity = {
    url: "https://swapi.dev/api/people/1/",
    name: "Luke Skywalker",
  };

  it("renders the entity name", () => {
    render(<EntityCard entity={baseEntity} />);
    expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
  });

  it("renders the entity image if provided", () => {
    const entityWithImage = {
      ...baseEntity,
      image: "https://example.com/luke.jpg",
    };
    render(<EntityCard entity={entityWithImage} />);
    const img = screen.getByRole("img", { name: /luke skywalker/i });
    expect(img).toHaveAttribute("src", entityWithImage.image);
    expect(img).toHaveAttribute("alt", "Luke Skywalker");
  });

 it("does not render an image if image is not provided", () => {
  render(<EntityCard entity={baseEntity} />);
  const img = screen.queryByRole("img", { name: /luke skywalker/i });
  expect(img).not.toBeInTheDocument();
});
});
