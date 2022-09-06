import {
  itSupportsClassName,
  itSupportsStyle,
  itSupportsOthers,
} from '@anatine/mantine-testing';
import { DEFAULT_LABELS } from '../RichTextEditor/default-labels';
import { DEFAULT_CONTROLS } from '../RichTextEditor/default-control';
import { Toolbar } from './Toolbar';

const defaultProps = {
  controls: DEFAULT_CONTROLS,
  labels: DEFAULT_LABELS,
};

describe('@anatine/mantine-text-editor/Toolbar', () => {
  itSupportsClassName(Toolbar, defaultProps);
  itSupportsStyle(Toolbar, defaultProps);
  itSupportsOthers(Toolbar, defaultProps);

  // it('has correct displayName', () => {
  //   expect(Toolbar.displayName).toStrictEqual('@mantine/rte/Toolbar');
  // });
});
