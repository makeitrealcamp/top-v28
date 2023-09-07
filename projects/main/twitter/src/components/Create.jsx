import { useContext, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import UserContext from "../containers/UserContext";

export default function Create({ onCreate }) {
  const { user } = useContext(UserContext);
  function onSubmit(event) {
    event.preventDefault();

    const { content, photo } = event.target.elements;
    const formData = new FormData();

    formData.append("content", content.value);
    formData.append("photo", photo.files[0]);

    content.value = "";
    photo.value = "";

    onCreate(formData);
  }

  return (
    <div className="d-flex border-bottom pb-2 mb-2">
      <div className="d-flex">
        <div className="p-2">
          <img
            src={`${import.meta.env.VITE_API_URL}/${user.photo}`}
            // src={user.photo}
            className="rounded-circle"
            width="50"
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
              placeholder="What is happening?!"
              name="content"
            />
          </Form.Group>
          <Form.Group>
            <Form.Control type="file" name="photo" />
          </Form.Group>
          <Button
            variant="primary"
            className="rounded-pill align-self-end text-white"
            type="submit"
          >
            Tweet
          </Button>
        </Form>
      </div>
    </div>
  );
}
