import React from 'react';
import { render, screen } from "@testing-library/react";
import { Loader } from "../../components/Loader";

describe("Loader", () => {
  test('renders loading span tag', () => {
    render(<Loader />)
    const headerElement = screen.getByText(/Loading.../i);
    expect(headerElement).toBeInTheDocument();
  })

  test('renders div with status role', () => {
    render(<Loader />)
    const divElement = screen.getByRole('status');
    expect(divElement).toBeInTheDocument();
  })
})
