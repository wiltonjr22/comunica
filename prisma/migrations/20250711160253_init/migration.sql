-- CreateTable
CREATE TABLE "Communications" (
    "id" TEXT NOT NULL,
    "titulo" VARCHAR(20) NOT NULL,
    "conteudo" VARCHAR(50) NOT NULL,
    "tipo_canal" VARCHAR(30) NOT NULL,
    "status" VARCHAR(30) NOT NULL,
    "autor" VARCHAR(30) NOT NULL,
    "data_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletado_em" TIMESTAMP(3),
    "data_envio" TIMESTAMP(3),
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Communications_pkey" PRIMARY KEY ("id")
);
