/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';
import {render} from '@testing-library/react';
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

  it('applies errorMessage when specified', () => {
    const { getByText } = render(<InputGroup errorMessage="error" {...defaultProps} />);
    const errorMessageTag = getByText('error');
    expect(errorMessageTag).toBeInTheDocument();
  });

  it('applies red border when errorMessage prop is passed', () => {
    const { getByLabelText } = render(<InputGroup errorMessage='error' {...defaultProps} />);
    const inputElement = getByLabelText('Test Label');

    expect(inputElement).toHaveClass('border-red-500');
  });

  it('applies default gray border when errorMessage attribute is not passed', () => {
    const { getByLabelText } = render(<InputGroup {...defaultProps} />);
    const inputElement = getByLabelText('Test Label');

    expect(inputElement).toHaveClass('border-gray-300');
  });
});
