import { InMemoryUsersRepository } from "../../../users/repositories/in-memory/InMemoryUsersRepository";
import { OperationType } from "../../entities/Statement";
import { InMemoryStatementsRepository } from "../../repositories/in-memory/InMemoryStatementsRepository";
import { GetStatementOperationUseCase } from "./GetStatementOperationUseCase";

let inMemoryStatementsRepository: InMemoryStatementsRepository;
let inMemoryUsersRepository: InMemoryUsersRepository;
let getStatementOperationUseCase: GetStatementOperationUseCase;

describe("Get Statement Operation", () => {
  beforeEach(() => {
    inMemoryStatementsRepository = new InMemoryStatementsRepository();
    inMemoryUsersRepository = new InMemoryUsersRepository();
    getStatementOperationUseCase = new GetStatementOperationUseCase(
      inMemoryUsersRepository,
      inMemoryStatementsRepository
    );
  });

  it("should be able to get a statement operation", async () => {
    const createUser = await inMemoryUsersRepository.create({
      name: "John Doe",
      email: "teste@teste.com",
      password: "123456",
    });

    const user_id = createUser.id as string;

    const createStatement = await inMemoryStatementsRepository.create({
      user_id,
      type: OperationType.DEPOSIT,
      amount: 100,
      description: "Deposit",
    });

    const statement_id = createStatement.id as string;

    const statement = await getStatementOperationUseCase.execute({
      user_id,
      statement_id: statement_id,
    });

    expect(statement).toBeTruthy();
    expect(statement.id).toBe(statement_id);
    expect(statement.type).toBe(OperationType.DEPOSIT);
    expect(statement.amount).toBe(100);
    expect(statement.description).toBe("Deposit");
    expect(statement.user_id).toBe(user_id);
  });
});
