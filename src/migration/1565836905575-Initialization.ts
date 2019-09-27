import {MigrationInterface, QueryRunner} from "typeorm";

export class Initialization1565836905575 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`
            --
            -- Name: color; Type: TABLE; Schema: public; Owner: focus
            --

            CREATE TABLE public.color (
                id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
                hex character varying NOT NULL,
                name character varying NOT NULL
            );
            
            
            ALTER TABLE public.color OWNER TO focus;

            `)

        await queryRunner.query(`
            --
            -- Name: list; Type: TABLE; Schema: public; Owner: focus
            --

            CREATE TABLE public.list (
                id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
                created_date timestamp without time zone DEFAULT now() NOT NULL,
                updated_date timestamp without time zone DEFAULT now() NOT NULL,
                deleted_timestamp timestamp without time zone,
                version integer NOT NULL,
                name character varying(50) NOT NULL,
                "userId" uuid
            );


            ALTER TABLE public.list OWNER TO focus;        
        `)
        
        await queryRunner.query(`
            --
            -- Name: permission; Type: TABLE; Schema: public; Owner: focus
            --

            CREATE TABLE public.permission (
                id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
                permission character varying DEFAULT 'basic'::character varying NOT NULL,
                "userId" uuid
            );


            ALTER TABLE public.permission OWNER TO focus;     
        `)

        await queryRunner.query(`
            --
            -- Name: project; Type: TABLE; Schema: public; Owner: focus
            --

            CREATE TABLE public.project (
                id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
                created_date timestamp without time zone DEFAULT now() NOT NULL,
                updated_date timestamp without time zone DEFAULT now() NOT NULL,
                deleted_timestamp timestamp without time zone,
                version integer NOT NULL,
                name character varying(240) NOT NULL,
                "userId" uuid NOT NULL,
                "colorId" uuid NOT NULL
            );
        
            ALTER TABLE public.project OWNER TO focus;
        `)

        await queryRunner.query(`
            --
            -- Name: project_tasks_task; Type: TABLE; Schema: public; Owner: focus
            --

            CREATE TABLE public.project_tasks_task (
                "projectId" uuid NOT NULL,
                "taskId" uuid NOT NULL
            );


            ALTER TABLE public.project_tasks_task OWNER TO focus;      
        `)

        await queryRunner.query(`
            --
            -- Name: task; Type: TABLE; Schema: public; Owner: focus
            --

            CREATE TABLE public.task (
                id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
                created_date timestamp without time zone DEFAULT now() NOT NULL,
                updated_date timestamp without time zone DEFAULT now() NOT NULL,
                deleted_timestamp timestamp without time zone,
                version integer NOT NULL,
                "columnPos" integer NOT NULL,
                name character varying(120) NOT NULL,
                notes character varying NOT NULL,
                "userId" uuid,
                "listId" uuid
            );


            ALTER TABLE public.task OWNER TO focus;        
        `)

        await queryRunner.query(`
            --
            -- Name: task_action; Type: TABLE; Schema: public; Owner: focus
            --

            CREATE TABLE public.task_action (
                id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
                start timestamp with time zone NOT NULL,
                "end" timestamp with time zone NOT NULL,
                "actionType" character varying NOT NULL,
                "taskId" uuid
            );


            ALTER TABLE public.task_action OWNER TO focus;        
        `)

        await queryRunner.query(`
            --
            -- Name: user; Type: TABLE; Schema: public; Owner: focus
            --

            CREATE TABLE public."user" (
                id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
                created_date timestamp without time zone DEFAULT now() NOT NULL,
                updated_date timestamp without time zone DEFAULT now() NOT NULL,
                version integer NOT NULL,
                email character varying(320) NOT NULL,
                password character varying NOT NULL,
                verified boolean DEFAULT false NOT NULL,
                first_name character varying(120),
                last_name character varying(120),
                dateofbirth date,
                gender character varying,
                ethnic_origin character varying,
                education character varying,
                household character varying,
                employment character varying,
                usage character varying
            );

            ALTER TABLE public."user" OWNER TO focus;
        `)

        await queryRunner.query(`
            --
            -- Name: permission PK_3b8b97af9d9d8807e41e6f48362; Type: CONSTRAINT; Schema: public; Owner: focus
            --

            ALTER TABLE ONLY public.permission
                ADD CONSTRAINT "PK_3b8b97af9d9d8807e41e6f48362" PRIMARY KEY (id);


            --
            -- Name: project PK_4d68b1358bb5b766d3e78f32f57; Type: CONSTRAINT; Schema: public; Owner: focus
            --

            ALTER TABLE ONLY public.project
                ADD CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY (id);


            --
            -- Name: user PK_cace4a159ff9f2512dd42373760; Type: CONSTRAINT; Schema: public; Owner: focus
            --

            ALTER TABLE ONLY public."user"
                ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id);


            --
            -- Name: color PK_d15e531d60a550fbf23e1832343; Type: CONSTRAINT; Schema: public; Owner: focus
            --

            ALTER TABLE ONLY public.color
                ADD CONSTRAINT "PK_d15e531d60a550fbf23e1832343" PRIMARY KEY (id);


            --
            -- Name: list PK_d8feafd203525d5f9c37b3ed3b9; Type: CONSTRAINT; Schema: public; Owner: focus
            --

            ALTER TABLE ONLY public.list
                ADD CONSTRAINT "PK_d8feafd203525d5f9c37b3ed3b9" PRIMARY KEY (id);


            --
            -- Name: task_action PK_dc71275b2c666e1e294365f3aa9; Type: CONSTRAINT; Schema: public; Owner: focus
            --

            ALTER TABLE ONLY public.task_action
                ADD CONSTRAINT "PK_dc71275b2c666e1e294365f3aa9" PRIMARY KEY (id);


            --
            -- Name: project_tasks_task PK_f4db09f71a294a43ba1191ee3c7; Type: CONSTRAINT; Schema: public; Owner: focus
            --

            ALTER TABLE ONLY public.project_tasks_task
                ADD CONSTRAINT "PK_f4db09f71a294a43ba1191ee3c7" PRIMARY KEY ("projectId", "taskId");


            --
            -- Name: task PK_fb213f79ee45060ba925ecd576e; Type: CONSTRAINT; Schema: public; Owner: focus
            --

            ALTER TABLE ONLY public.task
                ADD CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY (id);


            --
            -- Name: user UQ_e12875dfb3b1d92d7d7c5377e22; Type: CONSTRAINT; Schema: public; Owner: focus
            --

            ALTER TABLE ONLY public."user"
                ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE (email);


            --
            -- Name: IDX_9076819ac7aa0ecfa197771745; Type: INDEX; Schema: public; Owner: focus
            --

            CREATE INDEX "IDX_9076819ac7aa0ecfa197771745" ON public.project_tasks_task USING btree ("taskId");


            --
            -- Name: IDX_aa082f0ebc8b24afddce4718e8; Type: INDEX; Schema: public; Owner: focus
            --

            CREATE INDEX "IDX_aa082f0ebc8b24afddce4718e8" ON public.project_tasks_task USING btree ("projectId");


            --
            -- Name: task_action FK_14a20d27865a296554819705c7d; Type: FK CONSTRAINT; Schema: public; Owner: focus
            --

            ALTER TABLE ONLY public.task_action
                ADD CONSTRAINT "FK_14a20d27865a296554819705c7d" FOREIGN KEY ("taskId") REFERENCES public.task(id);


            --
            -- Name: list FK_46ded14b26382088c9f032f8953; Type: FK CONSTRAINT; Schema: public; Owner: focus
            --

            ALTER TABLE ONLY public.list
                ADD CONSTRAINT "FK_46ded14b26382088c9f032f8953" FOREIGN KEY ("userId") REFERENCES public."user"(id);


            --
            -- Name: project FK_718eacbc70047fa4b6fffc2a646; Type: FK CONSTRAINT; Schema: public; Owner: focus
            --

            ALTER TABLE ONLY public.project
                ADD CONSTRAINT "FK_718eacbc70047fa4b6fffc2a646" FOREIGN KEY ("colorId") REFERENCES public.color(id);


            --
            -- Name: project FK_7c4b0d3b77eaf26f8b4da879e63; Type: FK CONSTRAINT; Schema: public; Owner: focus
            --

            ALTER TABLE ONLY public.project
                ADD CONSTRAINT "FK_7c4b0d3b77eaf26f8b4da879e63" FOREIGN KEY ("userId") REFERENCES public."user"(id);


            --
            -- Name: project_tasks_task FK_9076819ac7aa0ecfa197771745e; Type: FK CONSTRAINT; Schema: public; Owner: focus
            --

            ALTER TABLE ONLY public.project_tasks_task
                ADD CONSTRAINT "FK_9076819ac7aa0ecfa197771745e" FOREIGN KEY ("taskId") REFERENCES public.task(id) ON DELETE CASCADE;


            --
            -- Name: project_tasks_task FK_aa082f0ebc8b24afddce4718e83; Type: FK CONSTRAINT; Schema: public; Owner: focus
            --

            ALTER TABLE ONLY public.project_tasks_task
                ADD CONSTRAINT "FK_aa082f0ebc8b24afddce4718e83" FOREIGN KEY ("projectId") REFERENCES public.project(id) ON DELETE CASCADE;


            --
            -- Name: permission FK_c60570051d297d8269fcdd9bc47; Type: FK CONSTRAINT; Schema: public; Owner: focus
            --

            ALTER TABLE ONLY public.permission
                ADD CONSTRAINT "FK_c60570051d297d8269fcdd9bc47" FOREIGN KEY ("userId") REFERENCES public."user"(id);


            --
            -- Name: task FK_d2275fe92da6a114d70796b7344; Type: FK CONSTRAINT; Schema: public; Owner: focus
            --

            ALTER TABLE ONLY public.task
                ADD CONSTRAINT "FK_d2275fe92da6a114d70796b7344" FOREIGN KEY ("listId") REFERENCES public.list(id);


            --
            -- Name: task FK_f316d3fe53497d4d8a2957db8b9; Type: FK CONSTRAINT; Schema: public; Owner: focus
            --

            ALTER TABLE ONLY public.task
                ADD CONSTRAINT "FK_f316d3fe53497d4d8a2957db8b9" FOREIGN KEY ("userId") REFERENCES public."user"(id);       
        `)

        // Insert Default Color Record

    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('DROP TABLE IF EXISTS color CASCADE;')
        await queryRunner.query('DROP TABLE IF EXISTS list CASCADE;')
        await queryRunner.query('DROP TABLE IF EXISTS "permission" CASCADE;')
        await queryRunner.query('DROP TABLE IF EXISTS "project" CASCADE;')
        await queryRunner.query('DROP TABLE IF EXISTS task CASCADE;')
        await queryRunner.query('DROP TABLE IF EXISTS task_action CASCADE;')
        await queryRunner.query('DROP TABLE IF EXISTS "user" CASCADE;')
        await queryRunner.query('DROP TABLE IF EXISTS project_tasks_task CASCADE;')

    }

}
