/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';
import { render } from '@testing-library/react';
import { InputGroup } from '../../../components/new_launch/InputGroup';
describe('InputGroup', () => {
  const mockOnChange = jest.fn();

  const defaultProps = {
    id: 'testId',
    label: 'Test Label',
    type: 'text',
    value: '',
    onChange: mockOnChange,
  };

  it('renders correctly', () => {
    const { getByLabelText } = render(<InputGroup {...defaultProps} />);
    const inputElement = getByLabelText('Test Label');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute('id', 'testId');
    expect(inputElement).toHaveAttribute('type', 'text');
  });

  it('applies "required" attribute when specified', () => {
    const { getByLabelText } = render(<InputGroup {...defaultProps} required />);
    const inputElement = getByLabelText('Test Label');

    expect(inputElement).toHaveAttribute('required');
  });

  it('applies red border when "required" attribute is specified', () => {
    const { getByLabelText } = render(<InputGroup {...defaultProps} required />);
    const inputElement = getByLabelText('Test Label');

    expect(inputElement).toHaveClass('border-red-500');
  });

  it('applies default gray border when "required" attribute is not specified', () => {
    const { getByLabelText } = render(<InputGroup {...defaultProps} />);
    const inputElement = getByLabelText('Test Label');

    expect(inputElement).toHaveClass('border-gray-300');
  });
});
