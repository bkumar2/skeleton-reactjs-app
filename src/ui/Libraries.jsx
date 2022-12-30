import DataTable from "react-data-table-component";

const data = [
    {
        name: "React Router",
        link: "https://reactrouter.com/web/guides/quick-start",
    },
    {
        name: "React Redux",
        link: "https://react-redux.js.org/introduction/getting-started",
    },
    {
        name: "React Bootstrap",
        link: "https://react-bootstrap.github.io/getting-started/introduction/",
    },
    {
        name: "React Data Table Component",
        link: "https://github.com/jbetancur/react-data-table-component",
    },
    {
        name: "Axios",
        link: "https://axios-http.com/docs/intro",
    },
    {
        name: "MomentJS",
        link: "https://momentjs.com/docs/",
    },
    {
        name: "Styled Components",
        link: "https://styled-components.com/docs/basics",
    },
    {
        name: "React DnD",
        link: "https://react-dnd.github.io/react-dnd/docs/overview",
    },
];

const columns = [
    {
        name: "Name",
        selector: (row) => row.name,
        sortable: true,
    },
    {
        name: "Link",
        selector: (row) => row.link,
        grow: 2,
        cell: (row) => <a href={row.link}>{row.link}</a>,
    },
];

function Libraries(props) {
    return (
        <div>
            <DataTable title="Libraries (DataTable Demo)" columns={columns} data={data} />
        </div>
    );
}
export default Libraries;
