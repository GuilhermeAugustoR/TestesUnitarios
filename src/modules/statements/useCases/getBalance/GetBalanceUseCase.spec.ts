import { InMemoryUsersRepository } from "../../../users/repositories/in-memory/InMemoryUsersRepository";
import { OperationType } from "../../entities/Statement";
import { InMemoryStatementsRepository } from "../../repositories/in-memory/InMemoryStatementsRepository";
import { GetBalanceUseCase } from "./GetBalanceUseCase";

let inMemoryStatementsRepository: InMemoryStatementsRepository;
let inMemoryUsersRepository: InMemoryUsersRepository;
let getBalanceUseCase: GetBalanceUseCase;

describe("List Balance", () => {
  beforeEach(() => {
    inMemoryStatementsRepository = new InMemoryStatementsRepository();
    inMemoryUsersRepository = new InMemoryUsersRepository();
    getBalanceUseCase = new GetBalanceUseCase(
      inMemoryStatementsRepository,
      inMemoryUsersRepository
    );
  });

  it("should be able to list all balance", async () => {
    const createUser = await inMemoryUsersRepository.create({
      name: "John Doe",
      email: "teste@teste.com",
      password: "123456",
    });

    const user_id = createUser.id as string;

    await inMemoryStatementsRepository.create({
      user_id,
      description: "Teste",
      amount: 100,
      type: OperationType.DEPOSIT,
    });

    await inMemoryStatementsRepository.create({
      user_id,
      description: "Teste2",
      amount: 50,
      type: OperationType.WITHDRAW,
    });

    await inMemoryStatementsRepository.create({
      user_id,
      description: "Teste3",
      amount: 100,
      type: OperationType.DEPOSIT,
    });

    const response = await getBalanceUseCase.execute({ user_id });

    expect(response).toBeTruthy();
    expect(response.statement).toHaveLength(3);
    expect(response.balance).toBe(150);
  });
});
