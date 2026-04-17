// Global
import { RichTextProps } from '@sitecore-content-sdk/nextjs/types/components/RichText';

const defaultData: RichTextProps = {
  field: {
    value:
      '<p>At vero eos et accusamus et iusto odio dignissimos ducimus qui <a rel="noopener noreferrer" href="https://www.google.com" target="_blank" class="overlay-source">blanditiis praesentium</a> voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.</p> <ul> <li>Et harum quidem rerum facilis <a rel="noopener noreferrer" href="https://www.google.com" target="_blank">est et expedita</a> distinctio.</li> <li>Nam libero tempore, cum soluta nobis est eligendi optio cumque.</li> </ul> <p>Nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et <a href="https://www.google.com">molestiae non recusandae</a>. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.</p>',
  },
};

export const regExTest: RichTextProps = {
  ...defaultData,
  field: {
    value:
      '<p>At vero eos et accusamus et iusto odio dignissimos ducimus qui <a rel="noopener noreferrer" href="https://www.google.com" target="_blank" class="overlay-source">blanditiis praesentium</a> voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.</p> <ul> <li>Et harum quidem rerum facilis <a rel="noopener noreferrer" href="https://www.google.com" target="_blank">est et expedita</a> distinctio.</li> <li>Nam libero tempore, cum soluta nobis est eligendi optio cumque.</li> </ul> <p>Nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et\n<p>voluptatum\n<a href="adfdf" rel="adfd" target="_blank">molestiae non recusandae</a>.</p>\n<a bb="dafa" target="_blank" crazy="crazy">foobar <span>foobar</span><><><><>>>>>><<<#*)#(*Q$)JALKJFLKJALKSFJ</a>\n<a zz="adlkfjalaldkfj" bb="lakdfjl" target="_blank"></a>\n<a data-foo="adlkfjalaldkfj" bb="lakdfjl" target="_blank">adfadfadf <span>afadfd</span></a>\n<a dababd="zzzz" target="_blank"></a>\n<a dababd="zzzz"></a>\n<a 11111="zzzz" target="_blank"></a>\n<a #%%#)(*)(%*="zzz" target="_blank"><div>foobarbaz</div></a>\n<a #%%#)(*)(%*="zzz" target="_blank">\n<div>foobarbaz</div>\n</a><a #%%#)(*)(%*="zzz">\n<div>foobarbaz</div>\n</a><a #%%#)(*)(%*="zzz" target="_blank">\n<div>foobarbaz</div>\n</a>\nItaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.</p>-',
  },
};

export default defaultData;
