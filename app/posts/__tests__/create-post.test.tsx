import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import NewPostScreen from '../create';
import { act } from 'react-test-renderer';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(() => Promise.resolve('test-token')),
}));
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ success: true }),
  })
) as jest.Mock;

describe('NewPostScreen', () => {
  it('рендерит поля ввода и кнопку публикации', () => {
    const { getByPlaceholderText, getByText } = render(<NewPostScreen />);
    expect(getByPlaceholderText('Enter the post text...')).toBeTruthy();
    expect(getByText('Publish')).toBeTruthy();
  });

  it('не отправляет пост при пустом тексте', async () => {
    const { getByText } = render(<NewPostScreen />);
    const publishBtn = getByText('Publish');
    await act(async () => {
      fireEvent.press(publishBtn);
    });
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('отправляет пост с текстом и выбранным топиком', async () => {
    const { getByPlaceholderText, getByText } = render(<NewPostScreen />);
    const input = getByPlaceholderText('Enter the post text...');
    const publishBtn = getByText('Publish');

    await act(async () => {
      fireEvent.changeText(input, 'Test post');
    });

    await act(async () => {
      fireEvent.press(publishBtn);
    });

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/posts'),
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            Authorization: expect.any(String),
          }),
          body: expect.any(String),
        })
      );
    });
  });

  it('можно выбрать топик', async () => {
    const { getByText } = render(<NewPostScreen />);
    const topicBtn = getByText('NEWS');
    await act(async () => {
      fireEvent.press(topicBtn);
    });
    // Проверяем, что кнопка стала активной (цвет изменился)
    expect(topicBtn.props.style).toEqual(
      expect.objectContaining({ color: 'white' })
    );
  });
});