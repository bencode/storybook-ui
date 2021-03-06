import initApi from '../init_api';
import { expect } from 'chai';
const { describe, it } = global;
import sinon from 'sinon';

describe('manager.api.config.initApi', () => {
  it('should expose correct API methods', (done) => {
    const actions = {
      api: {
        addAction: sinon.stub(),
        setStories: sinon.stub(),
        selectStory: sinon.stub(),
      },
      shortcuts: {
        handleEvent: sinon.stub(),
      },
    };

    const reduxStore = {
      subscribe: sinon.stub(),
    };

    const provider = {
      handleAPI(api) {
        expect(api.addAction).to.be.equal(actions.api.addAction);
        expect(api.setStories).to.be.equal(actions.api.setStories);
        expect(api.selectStory).to.be.equal(actions.api.selectStory);
        expect(api.handleShortcut).to.be.equal(actions.shortcuts.handleEvent);
        expect(typeof api.onStory).to.be.equal('function');
        done();
      },
    };

    initApi(provider, reduxStore, actions);
  });

  it('should trigger the onStory callback', (done) => {
    const actions = { api: {}, shortcuts: {} };
    const selectedKind = 'XXdd';
    const selectedStory = 'u8sd';

    const reduxStore = {
      subscribe: sinon.stub(),
      getState: () => ({
        api: { selectedKind, selectedStory },
      }),
    };

    const provider = {
      handleAPI(api) {
        api.onStory((kind, story) => {
          expect(kind).to.be.equal(selectedKind);
          expect(story).to.be.equal(selectedStory);
          done();
        });
      },
    };

    initApi(provider, reduxStore, actions);
    // calling the subscription
    reduxStore.subscribe.args[0][0]();
  });
});
