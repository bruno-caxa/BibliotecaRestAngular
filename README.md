# BibliotecaRestAngular

Front End de um projeto de estudos que simula uma biblioteca, feito em Angular 14.2.9.

## Informações de funcionamento

Website implementado para simular uma biblioteca, onde o usuario poderá apenas ver os livros disponiveis para a venda, para realizar
uma compra ou qualquer outra acão ele terá que ter um cadastro, após cadastrado ele pode usufruir de outros recursos como, adicionar os livros ao carrinho de compra e finalizar a mesma, após finalizada ele é redirecionado para a página "library" onde é possivel realizar a leitura de qualquer livro adquirido, o usuario comum também pode acessar a página "orders" onde é possivel ver o histórico de compras.
Além do usuário comum, temos o "admin" que possui funcionalidades extras, como cadastrar, editar ou excluir um livro.

## Informações de desenvolvimento

- Sistema totalmente responsivo
- Uso da API Amazon S3, para armazenar as imagens dos livros
- Uso do framework Ngrx Store, para armazenar o usuario e itens do carrinho de compra
