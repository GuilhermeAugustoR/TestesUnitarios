import { InMemoryUsersRepository } from "../../../users/repositories/in-memory/InMemoryUsersRepository";
import { OperationType } from "../../entities/Statement";
import { InMemoryStatementsRepository } from "../../repositories/in-memory/InMemoryStatementsRepository";
import { CreateStatementUseCase } from "./CreateStatementUseCase";

let inMemoryStatementsRepository: InMemoryStatementsRepository;
let inMemoryUsersRepository: InMemoryUsersRepository;
let createStatementUseCase: CreateStatementUseCase;

describe("Create Statement", () => {
  beforeEach(() => {
    inMemoryStatementsRepository = new InMemoryStatementsRepository();
    inMemoryUsersRepository = new InMemoryUsersRepository();
    createStatementUseCase = new CreateStatementUseCase(
      inMemoryUsersRepository,
      inMemoryStatementsRepository
    );
  });

  it("should be able to create a statement type DEPOSIT", async () => {
    const createUser = await inMemoryUsersRepository.create({
      name: "John Doe",
      email: "teste@teste.com",
      password: "123456",
    });

    const user_id = createUser.id as string;

    const createStatement = await createStatementUseCase.execute({
      user_id,
      type: OperationType.DEPOSIT,
      amount: 100,
      description: "Teste",
    });
    expect(createStatement).toBeTruthy();
    expect(createStatement.amount).toBe(100);
    expect(createStatement.description).toBe("Teste");
    expect(createStatement.type).toBe(OperationType.DEPOSIT);
    expect(createStatement.user_id).toBe(user_id);
  });

  it("should be able to create a statement type WITHDRAW", async () => {
    const createUser = await inMemoryUsersRepository.create({
      name: "John Doe",
      email: "teste@teste.com",
      password: "123456",
    });

    const user_id = createUser.id as string;

    const createStatement = await inMemoryStatementsRepository.create({
      user_id,
      type: OperationType.WITHDRAW,
      amount: 20,
      description: "Teste3",
    });

    expect(createStatement).toBeTruthy();
    expect(createStatement.amount).toBe(20);
    expect(createStatement.description).toBe("Teste3");
    expect(createStatement.type).toBe(OperationType.WITHDRAW);
    expect(createStatement.user_id).toBe(user_id);
  });
});
