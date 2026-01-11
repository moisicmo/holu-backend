import { ProgressStatus } from "@/generated/prisma/enums";
import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsEnum, IsUUID } from "class-validator";

export class CreateHabitProgressDto {
  @IsUUID()
  @ApiProperty({
    example: 1,
    description: 'Identificador del hábito',
  })
  habitId: string;

  @IsEnum(ProgressStatus)
  @ApiProperty({
    description: 'Estado del hábito diario',
    example: ProgressStatus.done,
    enum: ProgressStatus,
  })
  status: ProgressStatus;

  @IsDateString()
  @ApiProperty({
    description: 'Fecha local del usuario (YYYY-MM-DD o ISO)',
    example: '2025-12-15',
  })
  progressDate: string;
}

