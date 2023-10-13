import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

type CreateProps = {
  createLabel?: string;
  placeholder?: string;
  profilePhoto?: string;
  onCreate: (formData: FormData) => void;
};

interface CreateFormData {
  content: HTMLInputElement;
  photo: File;
}

export default function Create({
  createLabel = 'Tweet',
  placeholder = 'What is happening?!',
  profilePhoto = 'https://placehold.co/48x48',
  onCreate,
}: CreateProps) {
  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (event.target instanceof HTMLFormElement) {
      const target = event.target as typeof event.target & {
        content: { value: string };
        photo: { files: string[]; value: string };
      };
      const formData = new FormData();

      formData.append('content', target.content.value);
      if (target.photo.files[0]) {
        formData.append('photo', target.photo.files[0]);
      }

      target.content.value = '';
      target.photo.value = '';

      onCreate(formData);
    }
  }

  return (
    <div className="d-flex border-bottom pb-2 mb-2">
      <div className="d-flex">
        <div className="p-2">
          <img
            src={`${import.meta.env.VITE_API_URL}/${profilePhoto}`}
            className="rounded-circle object-fit-cover"
            width={48}
            height={48}
          />
        </div>
      </div>
      <div className="flex-grow-1">
        <Form className="d-flex flex-column" onSubmit={onSubmit}>
          <Form.Group className="mb-3 border-bottom">
            <Form.Control
              as="textarea"
              rows={2}
              className="border border-0"
              placeholder={placeholder}
              name="content"
            />
          </Form.Group>
          <Form.Group>
            <Form.Control type="file" name="photo" />
          </Form.Group>
          <Button
            variant="primary"
            className="rounded-pill align-self-end text-white mt-2"
            type="submit"
          >
            {createLabel}
          </Button>
        </Form>
      </div>
    </div>
  );
}
