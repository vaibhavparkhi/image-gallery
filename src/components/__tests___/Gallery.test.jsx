import React from "react";
import ReactDOM, { unmountComponentAtNode } from "react-dom";
import { fireEvent, waitFor, screen, render } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import "@testing-library/jest-dom";
import Gallery from "../gallery/Gallery";
import { createMemoryHistory } from "history";
import { BrowserRouter, Router } from "react-router-dom";
import App from "../../App";

import { getPhotos } from "../../services";

let container = null;

beforeEach(() => {
  // set up a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

it("on loading of gallery page", async () => {
  act(() => {
    ReactDOM.render(
      <BrowserRouter>
        <Gallery />
      </BrowserRouter>,
      container
    );
  });
  expect(container.textContent).toBe("Loading...");
});

it("on succesuful loading of gallery page", async () => {
  await act(() => {
    ReactDOM.render(
      <BrowserRouter>
        <Gallery />
      </BrowserRouter>,
      container
    );
  });
  await sleep(2000);
  expect(container.querySelector("#grid").children).toHaveLength(10);
});

it("on succesuful loading should display 10 images", async () => {
  await act(() => {
    ReactDOM.render(
      <BrowserRouter>
        <Gallery />
      </BrowserRouter>,
      container
    );
  });
  await sleep(2000);
  expect(container.querySelector("#grid").children).toHaveLength(10);
});

it("on click next button must load next 10 images", async () => {
  await act(() => {
    ReactDOM.render(
      <BrowserRouter>
        <Gallery />
      </BrowserRouter>,
      container
    );
  });
  await sleep(2000);
  const button = container.querySelector("#nextBtn");
  await act(() => {
    button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  expect(container.querySelector("#grid").children).toHaveLength(10);
});

it("on click previos button must load previous 10 images", async () => {
  await act(() => {
    ReactDOM.render(
      <BrowserRouter>
        <Gallery />
      </BrowserRouter>,
      container
    );
  });
  await sleep(2000);
  const button = container.querySelector("#preBtn");
  await act(() => {
    button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  expect(container.querySelector("#grid").children).toHaveLength(10);
});
