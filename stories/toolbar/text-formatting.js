import React, { useRef, useState } from 'react';
import {
  Bold,
  Italicize,
  Underline,
  Group,
  Textarea,
  Toolbar,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Copy,
  Cut,
  StyledSpinButton,
  CheckboxLabel
} from './styles';
import { DownButton, UpButton } from '../../src/components/spin-button';
import { ToolbarButton } from '../../src/components/toolbar';

export const TextFormatting = () => {
  const textarea = useRef({});
  const [bold, setBold] = useState(false);
  const [italicized, italicize] = useState(false);
  const [underlined, underline] = useState(false);
  const [alignment, setAlignment] = useState('left');
  const [text, setText] = useState(
    "Abraham Lincoln's Gettysburg Address\n\nFour score and seven years ago our fathers brought forth on this continent a new nation, conceived in Liberty, and dedicated to the proposition that all men are created equal.\n\nNow we are engaged in a great civil war, testing whether that nation, or any nation, so conceived and so dedicated, can long endure. We are met on a great battle-field of that war. We have come to dedicate a portion of that field, as a final resting place for those who here gave their lives that that nation might live. It is altogether fitting and proper that we should do this.\n\nBut, in a larger sense, we can not dedicate, we can not consecrate, we can not hallow, this ground. The brave men, living and dead, who struggled here, have consecrated it, far above our poor power to add or detract. The world will little note, nor long remember what we say here, but it can never forget what they did here. It is for us the living, rather, to be dedicated here to the unfinished work which they who fought here have thus far so nobly advanced. It is rather for us to be here dedicated to the great task remaining before us, that from these honored dead we take increased devotion to that cause for which they gave the last full measure of devotion, that we here highly resolve that these dead shall not have died in vain, that this nation, under God, shall have a new birth of freedom, and that government of the people, by the people, for the people, shall not perish from the earth."
  );
  const [copyAndCutDisabled, setCopyAndCutDisabled] = useState(true);
  const [fontSize, setFontSize] = useState(14);
  const valueText = `${fontSize} Point`;
  const max = 40;
  const min = 8;

  const [nightMode, setNightMode] = useState(false);
  return (
    <>
      <Toolbar>
        <Group>
          <Bold onClick={() => setBold(bold => !bold)} />
          <Italicize onClick={() => italicize(italicized => !italicized)} />
          <Underline onClick={() => underline(underlined => !underlined)} />
        </Group>
        <Group type="radiogroup">
          <AlignLeft
            aria-checked={alignment === 'left'}
            onClick={() => setAlignment('left')}
            type="radio"
            value="left"
          />
          <AlignCenter
            aria-checked={alignment === 'center'}
            onClick={() => setAlignment('center')}
            type="radio"
            value="center"
          />
          <AlignRight
            aria-checked={alignment === 'right'}
            onClick={() => setAlignment('right')}
            type="radio"
            value="right"
          />
        </Group>
        <Group>
          <Copy
            disabled={copyAndCutDisabled}
            onClick={() => {
              document.execCommand('copy');
            }}
          />
          <Cut
            disabled={copyAndCutDisabled}
            onClick={() => {
              document.execCommand('cut');
            }}
          />
        </Group>
        <Group>
          <ToolbarButton>
            {({ buttonRef, onFocus, onKeyDown, tabIndex }) => (
              <StyledSpinButton
                ref={buttonRef}
                aria-label="Font size in points"
                aria-valuemax={max}
                aria-valuemin={min}
                aria-valuenow={fontSize}
                aria-valuetext={valueText}
                onFocus={onFocus}
                onKeyDown={onKeyDown}
                onChange={setFontSize}
                tabIndex={tabIndex}
              >
                <span>{valueText}</span>
                <UpButton>
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12">
                    <polygon className="increase" fill="#333" points="0,12 11,12 6,2" />
                  </svg>
                </UpButton>
                <DownButton>
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12">
                    <polygon className="decrease" fill="#333" points="0,2 11,2 6,12" />
                  </svg>
                </DownButton>
              </StyledSpinButton>
            )}
          </ToolbarButton>
        </Group>
        <Group>
          <ToolbarButton>
            {({ buttonRef, onFocus, onKeyDown, tabIndex }) => (
              <CheckboxLabel>
                <input
                  ref={buttonRef}
                  id="checkbox"
                  type="checkbox"
                  onChange={() => setNightMode(prev => !prev)}
                  onFocus={onFocus}
                  onKeyDown={onKeyDown}
                  tabIndex={tabIndex}
                />
                Night Mode
              </CheckboxLabel>
            )}
          </ToolbarButton>
        </Group>
      </Toolbar>
      <Textarea
        ref={textarea}
        id="textarea1"
        onChange={e => setText(e.currentTarget.value)}
        onMouseUp={() =>
          setCopyAndCutDisabled(textarea.current.selectionStart === textarea.current.selectionEnd)
        }
        style={{
          background: nightMode ? 'black' : 'white',
          color: nightMode ? 'rgb(238, 238, 238)' : 'black',
          fontWeight: bold ? 'bold' : '',
          fontSize,
          fontStyle: italicized ? 'italic' : '',
          textAlign: alignment,
          textDecoration: underlined ? 'underline' : ''
        }}
        value={text}
      />
    </>
  );
};
