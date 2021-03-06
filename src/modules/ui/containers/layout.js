import Layout from '../components/layout';
import { useDeps, composeAll } from 'mantra-core';
import pick from 'lodash.pick';
import reduxComposer from '../libs/redux_composer';

export const composer = ({ shortcuts }) => {
  return pick(
    shortcuts,
    'showLeftPanel',
    'showDownPanel',
    'goFullScreen'
  );
};

export default composeAll(
  reduxComposer(composer),
  useDeps()
)(Layout);
