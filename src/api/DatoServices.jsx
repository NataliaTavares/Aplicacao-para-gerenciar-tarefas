export default class DatoCMSService {
    static async getTasks() {
        const url = "https://graphql.datocms.com/";
        const TOKEN = process.env.REACT_APP_READ_ONLY_API_TOKEN;

        const resposta = await fetch(url, {
            method: "POST",
            headers: {
                Authorization: TOKEN,
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                query: `query {
            allTarefas{
                id
                title
            }
          }`,
            }),
        });

        const tarefas = await resposta.json();
        return tarefas;
    }
}
