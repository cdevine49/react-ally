import React from 'react';
import { cleanup, render } from 'react-testing-library';
import { Section, Heading } from '../src/sectioning';

afterEach(cleanup);

test('Heading outside section', () => {
  const { asFragment } = render(<Heading id="test-id">Top Level</Heading>);
  expect(asFragment()).toMatchInlineSnapshot(`
<DocumentFragment>
  <h1
    id="test-id"
  >
    Top Level
  </h1>
</DocumentFragment>
`);
});

test('Sibling Sections', () => {
  const Component = () => (
    <>
      <Section>
        <Heading>Second Level</Heading>
      </Section>
      <Section>
        <Heading>Second Level Sibling</Heading>
      </Section>
    </>
  );
  const { asFragment } = render(<Component />);
  expect(asFragment()).toMatchInlineSnapshot(`
<DocumentFragment>
  <h2>
    Second Level
  </h2>
  <h2>
    Second Level Sibling
  </h2>
</DocumentFragment>
`);
});

test('section with show', () => {
  const { asFragment } = render(
    <Section show>
      <Heading>Second Level</Heading>
    </Section>
  );

  expect(asFragment()).toMatchInlineSnapshot(`
<DocumentFragment>
  <section>
    <h2>
      Second Level
    </h2>
  </section>
</DocumentFragment>
`);
});

test('Nested Sections', () => {
  const Component = () => (
    <Section>
      <Heading />
      <Section>
        <Heading />
        <Section>
          <Heading />
        </Section>
      </Section>
    </Section>
  );
  const { asFragment } = render(<Component />);
  expect(asFragment()).toMatchInlineSnapshot(`
<DocumentFragment>
  <h2 />
  <h3 />
  <h4 />
</DocumentFragment>
`);
});

test('Deeply nested siblings', () => {
  const Component = () => (
    <Section>
      <Section>
        <Section>
          <Section>
            <Section>
              <Section>
                <Section>
                  <Heading />
                </Section>
              </Section>
            </Section>
          </Section>
        </Section>
      </Section>
    </Section>
  );
  const { asFragment } = render(<Component />);
  expect(asFragment()).toMatchInlineSnapshot(`
<DocumentFragment>
  <h6 />
</DocumentFragment>
`);
});

test('levelOverride', () => {
  const Component = () => (
    <Section levelOverride={3}>
      <Heading />
      <Section>
        <Heading />
      </Section>
    </Section>
  );
  const { asFragment } = render(<Component />);
  expect(asFragment()).toMatchInlineSnapshot(`
<DocumentFragment>
  <h3 />
  <h4 />
</DocumentFragment>
`);
});
