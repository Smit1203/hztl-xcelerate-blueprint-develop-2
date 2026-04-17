// Local
import { RTEProps } from 'components/authorable/shared/content/RTE';
import { createComponentMockData } from 'lib/testing/rendering-mock';

const defaultData: RTEProps = createComponentMockData<RTEProps>('RTE', {
  text: {
    value:
      '<p><img src="https://dummyimage.com/600x400/cfcdc8/2f2d2e" alt="dummyimage"></p>' +
      '<h3>Unlock Your Financial Potential</h3>' +
      '<p>At Horizontal Financial Services, we are committed to guiding you towards a secure and prosperous financial future. Our innovative solutions and personalized approach ensure that your goals are within reach.</p>' +
      '<ul>' +
      '<li><strong>Expert Guidance:</strong> Tailored advice from experienced financial consultants.</li>' +
      '<li><strong>Comprehensive Solutions:</strong> From investment planning to retirement strategies.</li>' +
      '<li><strong>Customer-Centric Approach:</strong> Your success is our priority.</li>' +
      '</ul>',
  },
});

export const tableData: RTEProps = createComponentMockData<RTEProps>('RTE', {
  text: {
    value:
      '<h2>Table - Fixed width</h2>' +
      '<figure class="table" style="float:left;width:100%;">' +
      '<table class="ck-table-resized" style="background-color:hsl(0, 0%, 100%);border-style:solid;">' +
      '<colgroup>' +
      '<col style="width:25.09%;"><col style="width:26.3%;"><col style="width:28.77%;"><col style="width:19.84%;">' +
      '</colgroup>' +
      '<thead>' +
      '<tr>' +
      '<th>First Name</th><th>Last Name</th><th>Job Title</th><th>Twitter</th>' +
      '</tr>' +
      '</thead>' +
      '<tbody>' +
      '<tr><td data-column="First Name">James</td><td data-column="Last Name">Matman</td><td data-column="Job Title">Chief Sandwich Eater</td><td data-column="Twitter">@james</td></tr>' +
      '<tr><td data-column="First Name">Andor</td><td data-column="Last Name">Nagy</td><td data-column="Job Title">Designer</td><td data-column="Twitter">@andornagy</td></tr>' +
      '<tr><td data-column="First Name">Tamas</td><td data-column="Last Name">Biro</td><td data-column="Job Title">Game Tester</td><td data-column="Twitter">@tamas</td></tr>' +
      '<tr><td data-column="First Name">Zoli</td><td data-column="Last Name">Mastah</td><td data-column="Job Title">Mastah</td><td data-column="Twitter">@zoli</td></tr>' +
      '<tr><td data-column="First Name">Szabi</td><td data-column="Last Name">Nagy</td><td data-column="Job Title">Chief Sandwich Eater</td><td data-column="Twitter">@szabi</td></tr>' +
      '</tbody>' +
      '</table>' +
      '</figure>' +
      '<h2>Table - Fixed width no headings and no mobile styling</h2>' +
      '<figure class="table" style="float:left;width:100%;">' +
      '<table class="ck-table-resized" style="background-color:hsl(0, 0%, 100%);border-style:solid;">' +
      '<colgroup>' +
      '<col style="width:24.36%;"><col style="width:26.8%;"><col style="width:29.04%;"><col style="width:19.8%;">' +
      '</colgroup>' +
      '<tbody>' +
      '<tr><td>James</td><td>Matman</td><td>Chief Sandwich Eater</td><td>@james</td></tr>' +
      '<tr><td>Andor</td><td>Nagy</td><td>Designer</td><td>@andornagy</td></tr>' +
      '<tr><td>Tamas</td><td>Biro</td><td>Game Tester</td><td>@tamas</td></tr>' +
      '<tr><td>Zoli</td><td>Mastah</td><td>Mastah</td><td>@zoli</td></tr>' +
      '<tr><td>Szabi</td><td>Nagy</td><td>Chief Sandwich Eater</td><td>@szabi</td></tr>' +
      '</tbody>' +
      '</table>' +
      '</figure>',
  },
});

export const tableDataLeftAlign: RTEProps = createComponentMockData<RTEProps>('RTE', {
  text: {
    value:
      '<h2>Table - Left align</h2>' +
      '<figure class="table" style="float:left;">' +
      '<table style="background-color:hsl(0, 0%, 100%);border-style:solid;">' +
      '<thead>' +
      '<tr>' +
      '<th>First Name</th><th>Last Name</th><th>Job Title</th><th>Twitter</th>' +
      '</tr>' +
      '</thead>' +
      '<tbody>' +
      '<tr><td data-column="First Name">James</td><td data-column="Last Name">Matman</td><td data-column="Job Title">Chief Sandwich Eater</td><td data-column="Twitter">@james</td></tr>' +
      '<tr><td data-column="First Name">Andor</td><td data-column="Last Name">Nagy</td><td data-column="Job Title">Designer</td><td data-column="Twitter">@andornagy</td></tr>' +
      '<tr><td data-column="First Name">Tamas</td><td data-column="Last Name">Biro</td><td data-column="Job Title">Game Tester</td><td data-column="Twitter">@tamas</td></tr>' +
      '<tr><td data-column="First Name">Zoli</td><td data-column="Last Name">Mastah</td><td data-column="Job Title">Mastah</td><td data-column="Twitter">@zoli</td></tr>' +
      '<tr><td data-column="First Name">Szabi</td><td data-column="Last Name">Nagy</td><td data-column="Job Title">Chief Sandwich Eater</td><td data-column="Twitter">@szabi</td></tr>' +
      '</tbody>' +
      '</table>' +
      '</figure>',
  },
});

export const noData = {
  rnder: {},
  params: [],
};

export default defaultData;
