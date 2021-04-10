IF OBJECT_ID(N'[__EFMigrationsHistory]') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;
GO

BEGIN TRANSACTION;
GO

CREATE TABLE [Makes] (
    [Id] int NOT NULL IDENTITY,
    [Name] nvarchar(max) NULL,
    CONSTRAINT [PK_Makes] PRIMARY KEY ([Id])
);
GO

CREATE TABLE [Model] (
    [Id] int NOT NULL IDENTITY,
    [Name] nvarchar(max) NULL,
    [MakeId] int NOT NULL,
    CONSTRAINT [PK_Model] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_Model_Makes_MakeId] FOREIGN KEY ([MakeId]) REFERENCES [Makes] ([Id]) ON DELETE CASCADE
);
GO

CREATE INDEX [IX_Model_MakeId] ON [Model] ([MakeId]);
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20210311224344_InitialModel', N'5.0.4');
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

ALTER TABLE [Model] DROP CONSTRAINT [FK_Model_Makes_MakeId];
GO

ALTER TABLE [Model] DROP CONSTRAINT [PK_Model];
GO

EXEC sp_rename N'[Model]', N'Models';
GO

EXEC sp_rename N'[Models].[IX_Model_MakeId]', N'IX_Models_MakeId', N'INDEX';
GO

DECLARE @var0 sysname;
SELECT @var0 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Makes]') AND [c].[name] = N'Name');
IF @var0 IS NOT NULL EXEC(N'ALTER TABLE [Makes] DROP CONSTRAINT [' + @var0 + '];');
ALTER TABLE [Makes] ALTER COLUMN [Name] nvarchar(255) NOT NULL;
ALTER TABLE [Makes] ADD DEFAULT N'' FOR [Name];
GO

DECLARE @var1 sysname;
SELECT @var1 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Models]') AND [c].[name] = N'Name');
IF @var1 IS NOT NULL EXEC(N'ALTER TABLE [Models] DROP CONSTRAINT [' + @var1 + '];');
ALTER TABLE [Models] ALTER COLUMN [Name] nvarchar(255) NOT NULL;
ALTER TABLE [Models] ADD DEFAULT N'' FOR [Name];
GO

ALTER TABLE [Models] ADD CONSTRAINT [PK_Models] PRIMARY KEY ([Id]);
GO

ALTER TABLE [Models] ADD CONSTRAINT [FK_Models_Makes_MakeId] FOREIGN KEY ([MakeId]) REFERENCES [Makes] ([Id]) ON DELETE CASCADE;
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20210311225848_ApplyConstraints', N'5.0.4');
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

INSERT INTO Makes (Name) VALUES ('Make1')
GO

INSERT INTO Makes (Name) VALUES ('Make2')
GO

INSERT INTO Makes (Name) VALUES ('Make3')
GO

INSERT INTO Models (Name, MakeId) VALUES ('Make1-ModelA', (SELECT Id FROM Makes WHERE Name = 'Make1'))
GO

INSERT INTO Models (Name, MakeId) VALUES ('Make1-ModelB', (SELECT Id FROM Makes WHERE Name = 'Make1'))
GO

INSERT INTO Models (Name, MakeId) VALUES ('Make1-ModelC', (SELECT Id FROM Makes WHERE Name = 'Make1'))
GO

INSERT INTO Models (Name, MakeId) VALUES ('Make2-ModelA', (SELECT Id FROM Makes WHERE Name = 'Make2'))
GO

INSERT INTO Models (Name, MakeId) VALUES ('Make2-ModelB', (SELECT Id FROM Makes WHERE Name = 'Make2'))
GO

INSERT INTO Models (Name, MakeId) VALUES ('Make2-ModelC', (SELECT Id FROM Makes WHERE Name = 'Make2'))
GO

INSERT INTO Models (Name, MakeId) VALUES ('Make3-ModelA', (SELECT Id FROM Makes WHERE Name = 'Make3'))
GO

INSERT INTO Models (Name, MakeId) VALUES ('Make3-ModelB', (SELECT Id FROM Makes WHERE Name = 'Make3'))
GO

INSERT INTO Models (Name, MakeId) VALUES ('Make3-ModelC', (SELECT Id FROM Makes WHERE Name = 'Make3'))
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20210311230403_SeedDatabase', N'5.0.4');
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

CREATE TABLE [Features] (
    [Id] int NOT NULL IDENTITY,
    [Name] nvarchar(255) NOT NULL,
    CONSTRAINT [PK_Features] PRIMARY KEY ([Id])
);
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20210312030943_AddFeature', N'5.0.4');
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

INSERT INTO Features (Name) VALUES ('Feature1')
GO

INSERT INTO Features (Name) VALUES ('Feature2')
GO

INSERT INTO Features (Name) VALUES ('Feature3')
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20210312031145_SeedFeatures', N'5.0.4');
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

CREATE TABLE [Vehicles] (
    [Id] int NOT NULL IDENTITY,
    [ModelId] int NOT NULL,
    [IsRegistered] bit NOT NULL,
    [ContactName] nvarchar(255) NOT NULL,
    [ContactEmail] nvarchar(255) NULL,
    [ContactPhone] nvarchar(255) NOT NULL,
    [LastUpdate] datetime2 NOT NULL,
    CONSTRAINT [PK_Vehicles] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_Vehicles_Models_ModelId] FOREIGN KEY ([ModelId]) REFERENCES [Models] ([Id]) ON DELETE CASCADE
);
GO

CREATE TABLE [VehicleFeatures] (
    [VehicleId] int NOT NULL,
    [FeatureId] int NOT NULL,
    CONSTRAINT [PK_VehicleFeatures] PRIMARY KEY ([VehicleId], [FeatureId]),
    CONSTRAINT [FK_VehicleFeatures_Features_FeatureId] FOREIGN KEY ([FeatureId]) REFERENCES [Features] ([Id]) ON DELETE CASCADE,
    CONSTRAINT [FK_VehicleFeatures_Vehicles_VehicleId] FOREIGN KEY ([VehicleId]) REFERENCES [Vehicles] ([Id]) ON DELETE CASCADE
);
GO

CREATE INDEX [IX_VehicleFeatures_FeatureId] ON [VehicleFeatures] ([FeatureId]);
GO

CREATE INDEX [IX_Vehicles_ModelId] ON [Vehicles] ([ModelId]);
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20210315033710_AddVehicle', N'5.0.4');
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

CREATE TABLE [Photos] (
    [Id] int NOT NULL IDENTITY,
    [FileName] nvarchar(255) NOT NULL,
    [VehicleId] int NULL,
    CONSTRAINT [PK_Photos] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_Photos_Vehicles_VehicleId] FOREIGN KEY ([VehicleId]) REFERENCES [Vehicles] ([Id]) ON DELETE NO ACTION
);
GO

CREATE INDEX [IX_Photos_VehicleId] ON [Photos] ([VehicleId]);
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20210329220623_AddPhoto', N'5.0.4');
GO

COMMIT;
GO

