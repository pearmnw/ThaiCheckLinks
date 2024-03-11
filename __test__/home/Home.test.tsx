// *.test.tsx
// Try Component Test (Not working) So just use Playwright for System test pai leay
import Home from "@/app/[locale]/page";
import { render, screen } from "@/customRender";
import { I18nProviderClient } from "@/locales/client";
import { beforeEach, describe, expect } from "@jest/globals";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Example test", () => {
  test("checks if homepage title is rendered", async () => {
    render(
      <I18nProviderClient locale="en">
        <Home />
      </I18nProviderClient>
    );

    const title = screen.getByText(
      "Start Checking Website Links For Your Safety"
    );

    expect(title).toEqual("Start Checking Website Links For Your Safety");
  });
});
