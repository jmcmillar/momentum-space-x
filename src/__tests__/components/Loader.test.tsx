import React from 'react';
import { render, screen } from "@testing-library/react";
import { Loader } from "../../components/Loader";

describe("Loader", () => {
  test('renders loading div tag', () => {
    render(<Loader />)
    const headerElement = screen.getByText(/loading/i);
    expect(headerElement).toBeInTheDocument();
  });
})
