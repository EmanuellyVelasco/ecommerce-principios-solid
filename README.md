## Melhorias Implementadas
O objetivo das melhorias foi aplicar os princípios de Inversão de Dependência e Inversão de Controle para tornar o sistema desacoplado de bibliotecas de infraestrutura.

### Inversão de Controle (IoC) e Injeção de Dependência
Implementamos o uso do **InversifyJS** para gerenciar o ciclo de vida dos objetos e automatizar a injeção de dependências:

- **Container de IoC:** Criamos um container centralizado que mapeia interfaces para suas implementações concretas, eliminando o uso de `new` dentro das classes.

- **Uso de Symbols:** Definimos identificadores únicos para as interfaces, garantindo que o TypeScript e o Inversify consigam resolver as dependências corretamente em tempo de execução.

### Desacoplamento da Camada de Domínio (DIP)
Isolamos a regra de negócio do `ReportService`, impedindo que ele dependa de ferramentas de terceiros (Winston, Nodemailer ou Faker). Isso foi feito através de abstrações:

- **ILogger:** Interface para abstrair o registro de logs, permitindo trocar o Winston por qualquer outro logger sem alterar o serviço.

- **IMailer:** Interface para o envio de e-mails, removendo a dependência direta do Nodemailer.

- **IReportService:** Interface que define o contrato para a geração e envio de relatórios fictícios.

### Comportamento Baseado no Ambiente
Implementamos a alternância de comportamentos de infraestrutura conforme as variáveis de ambiente (`APP_ENV`):

- **Modo Dev:** O adaptador de e-mail apenas simula o envio no console, facilitando o desenvolvimento e evitando disparos reais.

- **Modo Prod:** O adaptador utiliza o cliente SMTP configurado para realizar envios reais.

- **Segurança de Tipos:** A validação de negócio integrada impede a geração de relatórios com mais de 10 registros, lançando o erro customizado `InvalidReportSizeError`.
