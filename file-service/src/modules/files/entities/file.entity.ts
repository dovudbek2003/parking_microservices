import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('files')
export class FileEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ name: 'url', type: 'text', nullable: false })
    url: string;
    @Column({ name: 'mimetype', type: 'varchar', nullable: false })
    mimetype: string;
    @Column({ name: 'size', type: 'integer', nullable: false })
    size: number;
    @CreateDateColumn({
        name: 'created_at',
        type: 'timestamp',
        nullable: false,
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: 'last_edited_at',
        type: 'timestamp',
        nullable: false,
    })
    lastEditedAt: Date;
}
