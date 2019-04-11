declare const tinymce: any;

const setup = (editor, url) => {
  editor.addButton('separator', {
    text: 'separator button',
    icon: false,
    onclick: () => {
      // tslint:disable-next-line:no-console
      editor.setContent('<p>content added from separator</p>');
    }
  });
};

tinymce.PluginManager.add('separator', setup);

// tslint:disable-next-line:no-empty
export default () => {};
