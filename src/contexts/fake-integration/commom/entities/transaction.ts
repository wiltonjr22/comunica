import { ApiProperty } from "@nestjs/swagger";

export class TransactionEntity {
  @ApiProperty({ example: 1, description: "ID do usuário relacionado à transação" })
  userId: number;

  @ApiProperty({ example: 101, description: "ID da transação" })
  id: number;

  @ApiProperty({ example: "Comprar produto X", description: "Título ou descrição da transação" })
  title: string;

  @ApiProperty({ example: true, description: "Indica se a transação foi concluída" })
  completed: boolean;
}
