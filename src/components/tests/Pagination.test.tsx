import { render, screen, fireEvent } from "@testing-library/react";
import { Pagination } from "../Pagination";

describe("Pagination", () => {
  const setup = (page = 1, totalPages = 5) => {
    const onPrev = jest.fn();
    const onNext = jest.fn();

    render(
      <Pagination
        page={page}
        totalPages={totalPages}
        onPrev={onPrev}
        onNext={onNext}
      />,
    );

    return { onPrev, onNext };
  };

  it("renders current page and total pages", () => {
    setup(2, 5);
    expect(screen.getByText("Page 2 of 5")).toBeInTheDocument();
  });

  it("disables Previous button on first page", () => {
    setup(1, 5);
    const prevButton = screen.getByRole("button", { name: /previous/i });
    expect(prevButton).toBeDisabled();
  });

  it("disables Next button on last page", () => {
    setup(5, 5);
    const nextButton = screen.getByRole("button", { name: /next/i });
    expect(nextButton).toBeDisabled();
  });

  it("calls onPrev and onNext when buttons are clicked", () => {
    const { onPrev, onNext } = setup(3, 5);

    fireEvent.click(screen.getByRole("button", { name: /previous/i }));
    fireEvent.click(screen.getByRole("button", { name: /next/i }));

    expect(onPrev).toHaveBeenCalled();
    expect(onNext).toHaveBeenCalled();
  });
});
