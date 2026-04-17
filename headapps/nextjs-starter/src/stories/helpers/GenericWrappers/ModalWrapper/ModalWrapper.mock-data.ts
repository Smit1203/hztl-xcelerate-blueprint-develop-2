// Local
import { ModalWrapperProps } from 'helpers/GenericWrappers/ModalWrapper/ModalWrapper';

/*
 * Mock Modal Data
 */

const defaultData: ModalWrapperProps = {
  content: 'Text',
  id: '2845070A-AEBD-4B45-A59D-88269B081204',
  label: 'Modal',
  openOnLoad: false,
  size: 'Large',
  title: 'Title',
  trigger: 'Button',
};

export const modalWithAnchorAsTriggerData: ModalWrapperProps = {
  ...defaultData,
  content: 'Text',
  id: '2845070A-AEBD-4B45-A59D-88269B081205',
  label: 'Modal with Anchor as Trigger',
  openOnLoad: false,
  title: 'Title with Anchor Link as Trigger',
  trigger: 'Anchor',
};

export const modalWithRemoteTriggerData: ModalWrapperProps = {
  ...defaultData,
  content: 'Text',
  id: '2845070A-AEBD-4B45-A59D-88269B081206',
  label: 'Modal with Remote Trigger',
  openOnLoad: false,
  title: 'Title with Remote Trigger',
  trigger: undefined,
};

export const modalWithRichTextTitleData: ModalWrapperProps = {
  ...defaultData,
  content: 'Text',
  id: '2845070A-AEBD-4B45-A59D-88269B081207',
  label: 'Modal with Video',
  openOnLoad: false,
  title: 'Title with Markup',
  trigger: 'Button',
};

export const modalWithVideoData: ModalWrapperProps = {
  ...defaultData,
  content: 'Video',
  id: '2845070A-AEBD-4B45-A59D-88269B081208',
  label: 'Modal with Video',
  openOnLoad: false,
  title: 'Title',
  trigger: 'Button',
};

/*
 * Mock Embedded Component Data
 */

export const embeddedVideoData = {
  autoplay: false,
  captions: [],
  controls: true,
  fluid: true,
  height: 'auto',
  loop: false,
  muted: false,
  poster: './assets/videos/oceans.png',
  sources: [
    {
      src: './assets/videos/oceans.mp4',
      type: 'video/mp4',
    },
  ],
  subtitles: [],
  width: '600px',
};

export default defaultData;
