import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { ShowUserProfileUseCase } from "./ShowUserProfileUseCase";

let showUserProfileUseCase: ShowUserProfileUseCase;
let inMemoryUsersRepository: InMemoryUsersRepository;

describe("Profile", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    showUserProfileUseCase = new ShowUserProfileUseCase(
      inMemoryUsersRepository
    );
  });

  it("should be able to show user profile", async () => {
    const createUser = await inMemoryUsersRepository.create({
      name: "John Doe",
      email: "teste@teste.com",
      password: "123456",
    });

    const userId = createUser.id as string;

    const user = await showUserProfileUseCase.execute(userId);

    expect(user).toBeTruthy();
    expect(user.id).toBe(userId);
    expect(user.email).toBe("teste@teste.com");
    expect(user.name).toBe("John Doe");
  });
});
