import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { DetailListItem } from "../DetailListItem";

describe("DetailListItem", () => {
  it("renders a single item with no link", () => {
    render(
      <DetailListItem title="Homeworld" singleItem={{ label: "Tatooine" }} />,
    );

    expect(screen.getByText("Homeworld")).toBeInTheDocument();
    expect(screen.getByText("Tatooine")).toBeInTheDocument();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("renders a single item with a link and arrow icon", () => {
    render(
      <MemoryRouter>
        <DetailListItem
          title="Homeworld"
          singleItem={{ label: "Tatooine", to: "/planets/1" }}
        />
      </MemoryRouter>,
    );

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/planets/1");
    expect(screen.getByText("Tatooine")).toBeInTheDocument();
    expect(screen.getByAltText("arrow")).toBeInTheDocument();
  });

  it("renders multiple pills with and without links", () => {
    render(
      <MemoryRouter>
        <DetailListItem
          title="Starships"
          multiItems={[
            { label: "X-Wing", to: "/starships/1" },
            { label: "TIE Fighter" },
          ]}
        />
      </MemoryRouter>,
    );

    expect(screen.getByText("Starships")).toBeInTheDocument();
    expect(screen.getByText("X-Wing")).toBeInTheDocument();
    expect(screen.getByText("TIE Fighter")).toBeInTheDocument();

    const links = screen.getAllByRole("link");
    expect(links[0]).toHaveAttribute("href", "/starships/1");
  });
});
