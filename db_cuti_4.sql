--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5
-- Dumped by pg_dump version 17.5

-- Started on 2025-07-18 12:44:23

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'WIN1252';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 4 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: pg_database_owner
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO pg_database_owner;

--
-- TOC entry 4976 (class 0 OID 0)
-- Dependencies: 4
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: pg_database_owner
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- TOC entry 868 (class 1247 OID 24801)
-- Name: applicable_gender; Type: TYPE; Schema: public; Owner: backend
--

CREATE TYPE public.applicable_gender AS ENUM (
    'm',
    'f',
    'mf'
);


ALTER TYPE public.applicable_gender OWNER TO backend;

--
-- TOC entry 853 (class 1247 OID 24759)
-- Name: gender; Type: TYPE; Schema: public; Owner: backend
--

CREATE TYPE public.gender AS ENUM (
    'male',
    'female'
);


ALTER TYPE public.gender OWNER TO backend;

--
-- TOC entry 871 (class 1247 OID 24808)
-- Name: leave_type; Type: TYPE; Schema: public; Owner: backend
--

CREATE TYPE public.leave_type AS ENUM (
    'personal leave',
    'mandatory leave',
    'special leave'
);


ALTER TYPE public.leave_type OWNER TO backend;

--
-- TOC entry 856 (class 1247 OID 24764)
-- Name: role; Type: TYPE; Schema: public; Owner: backend
--

CREATE TYPE public.role AS ENUM (
    'karyawan_tetap',
    'karyawan_kontrak',
    'magang',
    'admin',
    'super_admin'
);


ALTER TYPE public.role OWNER TO backend;

--
-- TOC entry 865 (class 1247 OID 24791)
-- Name: status; Type: TYPE; Schema: public; Owner: backend
--

CREATE TYPE public.status AS ENUM (
    'pending',
    'approved',
    'rejected'
);


ALTER TYPE public.status OWNER TO backend;

--
-- TOC entry 859 (class 1247 OID 24776)
-- Name: status_active; Type: TYPE; Schema: public; Owner: backend
--

CREATE TYPE public.status_active AS ENUM (
    'active',
    'resign'
);


ALTER TYPE public.status_active OWNER TO backend;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 220 (class 1259 OID 24831)
-- Name: tb_balance; Type: TABLE; Schema: public; Owner: backend
--

CREATE TABLE public.tb_balance (
    id_balance character varying(50) NOT NULL,
    amount smallint NOT NULL,
    receive_date date NOT NULL,
    expired_date date NOT NULL,
    "NIK" character varying(16) NOT NULL
);


ALTER TABLE public.tb_balance OWNER TO backend;

--
-- TOC entry 223 (class 1259 OID 24909)
-- Name: tb_balance_adjustment; Type: TABLE; Schema: public; Owner: backend
--

CREATE TABLE public.tb_balance_adjustment (
    id_adjustment character varying(50) NOT NULL,
    adjustment_value smallint NOT NULL,
    notes text NOT NULL,
    created_at timestamp(0) with time zone NOT NULL,
    actor character varying(50) NOT NULL,
    "NIK" character varying(16) NOT NULL
);


ALTER TABLE public.tb_balance_adjustment OWNER TO backend;

--
-- TOC entry 224 (class 1259 OID 25150)
-- Name: tb_jwt_token; Type: TABLE; Schema: public; Owner: backend
--

CREATE TABLE public.tb_jwt_token (
    access_token character varying(500) NOT NULL,
    "NIK" character varying(16) NOT NULL,
    device_id character varying(255) NOT NULL,
    device_info character varying(255) NOT NULL
);


ALTER TABLE public.tb_jwt_token OWNER TO backend;

--
-- TOC entry 221 (class 1259 OID 24874)
-- Name: tb_leave; Type: TABLE; Schema: public; Owner: backend
--

CREATE TABLE public.tb_leave (
    id_leave character varying(50) NOT NULL,
    title character varying(255) NOT NULL,
    leave_type public.leave_type NOT NULL,
    start_date date NOT NULL,
    end_date date NOT NULL,
    total_days smallint NOT NULL,
    reason text NOT NULL,
    status public.status DEFAULT 'pending'::public.status NOT NULL,
    created_at timestamp(0) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "NIK" character varying(50) NOT NULL,
    id_special character varying(50),
    id_mandatory character varying(50)
);


ALTER TABLE public.tb_leave OWNER TO backend;

--
-- TOC entry 222 (class 1259 OID 24897)
-- Name: tb_leave_log; Type: TABLE; Schema: public; Owner: backend
--

CREATE TABLE public.tb_leave_log (
    id_log character varying(50) NOT NULL,
    old_status public.status NOT NULL,
    new_status public.status NOT NULL,
    reason text NOT NULL,
    changed_at timestamp(0) with time zone NOT NULL,
    changed_by_nik character varying(16) NOT NULL,
    id_leave character varying(50) NOT NULL
);


ALTER TABLE public.tb_leave_log OWNER TO backend;

--
-- TOC entry 218 (class 1259 OID 24815)
-- Name: tb_mandatory_leave; Type: TABLE; Schema: public; Owner: backend
--

CREATE TABLE public.tb_mandatory_leave (
    id_mandatory character varying(50) NOT NULL,
    title character varying(255) NOT NULL,
    duration smallint NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    description text NOT NULL
);


ALTER TABLE public.tb_mandatory_leave OWNER TO backend;

--
-- TOC entry 219 (class 1259 OID 24823)
-- Name: tb_special_leave; Type: TABLE; Schema: public; Owner: backend
--

CREATE TABLE public.tb_special_leave (
    id_special character varying(50) NOT NULL,
    title character varying(255) NOT NULL,
    applicable_gender public.applicable_gender NOT NULL,
    duration smallint NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    description text NOT NULL
);


ALTER TABLE public.tb_special_leave OWNER TO backend;

--
-- TOC entry 217 (class 1259 OID 24784)
-- Name: tb_users; Type: TABLE; Schema: public; Owner: backend
--

CREATE TABLE public.tb_users (
    "NIK" character varying(16) NOT NULL,
    fullname character varying(50) NOT NULL,
    email character varying(50) NOT NULL,
    password character varying(20) NOT NULL,
    gender public.gender NOT NULL,
    role public.role NOT NULL,
    status_active public.status_active DEFAULT 'active'::public.status_active NOT NULL,
    join_date date NOT NULL
);


ALTER TABLE public.tb_users OWNER TO backend;

--
-- TOC entry 4966 (class 0 OID 24831)
-- Dependencies: 220
-- Data for Name: tb_balance; Type: TABLE DATA; Schema: public; Owner: backend
--

COPY public.tb_balance (id_balance, amount, receive_date, expired_date, "NIK") FROM stdin;
b74bd130-dc2d-4f9c-9ee5-2b56a8698140	12	2025-01-01	2027-07-31	100002
13fab622-421d-4a3f-b101-1ab0ef33ac59	12	2025-01-01	2027-01-01	100005
c955ad0a-04e4-4cb0-a658-d51b1dd28bf1	14	2024-06-01	2026-08-30	100002
83d14fa2-e31d-4f4e-83fa-43f8daa14045	1	2025-07-01	2025-09-01	100001
83e0b21e-64e4-4e87-aeaf-bae7a4ca1183	1	2025-06-01	2025-08-01	100001
4a687050-4960-4c63-a1bd-9f5d14e3559f	12	2025-01-01	2027-01-01	100004
d47577b6-28be-4182-bc67-07a131355d4d	3	2024-06-01	2026-06-01	100004
\.


--
-- TOC entry 4969 (class 0 OID 24909)
-- Dependencies: 223
-- Data for Name: tb_balance_adjustment; Type: TABLE DATA; Schema: public; Owner: backend
--

COPY public.tb_balance_adjustment (id_adjustment, adjustment_value, notes, created_at, actor, "NIK") FROM stdin;
9f486d2b-151c-42aa-bf10-3cf7b2cd21c5	2	Penyesuaian cuti awal tahun	2025-07-09 20:38:54+07	admin_hrd	100001
d675138c-44bd-4320-8cfb-80a973028580	2	Penyesuaian cuti awal tahun	2025-07-09 20:38:54+07	admin_hrd	100002
933c49b3-f461-4066-b793-640a6adb91d2	2	Penyesuaian cuti awal tahun	2025-07-09 20:38:54+07	admin_hrd	100003
e33cde4b-74d2-448f-9245-45f984096b3d	2	Penyesuaian cuti awal tahun	2025-07-09 20:38:54+07	admin_hrd	100004
9b9917ba-2a38-45ca-8a60-d0a7780b4030	2	Penyesuaian cuti awal tahun	2025-07-09 20:38:54+07	admin_hrd	100005
05eda1ec-43f2-41e8-8da8-7eabd8838ef2	2	test update	2025-07-14 15:25:10+07	admin	100002
d3c8c4e8-f446-44fc-852e-8745c007591d	6	test update lagi	2025-07-14 15:43:41+07	admin	100002
\.


--
-- TOC entry 4970 (class 0 OID 25150)
-- Dependencies: 224
-- Data for Name: tb_jwt_token; Type: TABLE DATA; Schema: public; Owner: backend
--

COPY public.tb_jwt_token (access_token, "NIK", device_id, device_info) FROM stdin;
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJOSUsiOiIxMDAwMDQiLCJlbWFpbCI6ImFuZGkuYWRtaW5AcGVydXNhaGFhbi5jb20iLCJmdWxsbmFtZSI6IkFuZGkgQWRtaW4iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NTI4MTMxNjgsImV4cCI6MTc1Mjg5OTU2OH0.3PyeAqwslXT36F4ct4n8ZrrV8KzRx0gvNEBGqA7ARSk	100004	056a2f9a-fd23-4cf7-92bc-cbf1071f6ad8	138.0.0.0-Edge-Windows
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJOSUsiOiIxMDAwMDQiLCJlbWFpbCI6ImFuZGkuYWRtaW5AcGVydXNhaGFhbi5jb20iLCJmdWxsbmFtZSI6IkFuZGkgQWRtaW4iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NTI4MDQzNTMsImV4cCI6MTc1Mjg5MDc1M30.vCp8g7ORW8vKojJex9AsANl1eaxoiero2NpdVMS9P8s	100004	c684662c-ea1a-4c73-8418-1d059e91e61d	114.0.1823.67-Edge-Windows
\.


--
-- TOC entry 4967 (class 0 OID 24874)
-- Dependencies: 221
-- Data for Name: tb_leave; Type: TABLE DATA; Schema: public; Owner: backend
--

COPY public.tb_leave (id_leave, title, leave_type, start_date, end_date, total_days, reason, status, created_at, "NIK", id_special, id_mandatory) FROM stdin;
bb14bd1e-4dc0-4bae-949a-8782db6b1416	Keperluan Pribadi Awal Tahun	personal leave	2025-01-10	2025-01-10	1	Urusan keluarga	approved	2025-07-09 20:38:54+07	100001	\N	\N
73aefaed-be94-4b66-958d-23e16f085e08	Pelatihan Wajib	mandatory leave	2025-04-05	2025-04-05	1	Ikut pelatihan internal perusahaan	approved	2025-07-09 20:38:54+07	100001	\N	d61a5a52-466f-479b-a2b6-7a378e2800bd
1d5e42ad-9f31-40df-87c3-6c700d7dff41	Cuti Melahirkan Anak Kedua	special leave	2025-05-01	2025-07-30	90	Proses kelahiran dan pemulihan pasca melahirkan.	approved	2025-07-09 20:38:54+07	100001	f4a2dc10-dcbb-416e-ac55-d0de4175ae24	\N
e222db4b-7038-4b85-b0cc-85afa6b2f367	Keperluan Pribadi Awal Tahun	personal leave	2025-01-10	2025-01-10	1	Urusan keluarga	approved	2025-07-09 20:38:54+07	100004	\N	\N
888e3488-6ddf-4789-8685-94a8afad3172	Keperluan Pribadi Awal Tahun	personal leave	2025-01-10	2025-01-10	1	Urusan keluarga	approved	2025-07-09 20:38:54+07	100005	\N	\N
6bc6fb99-0b48-451e-8f73-dad1cff1b463	Pelatihan Wajib	mandatory leave	2025-04-05	2025-04-05	1	Ikut pelatihan internal perusahaan	approved	2025-07-09 20:38:54+07	100005	\N	d61a5a52-466f-479b-a2b6-7a378e2800bd
2ce30aa2-4567-472d-931f-2d20f0202ec7	Cuti Melahirkan Anak Kedua	special leave	2025-05-01	2025-07-30	90	Proses kelahiran dan pemulihan pasca melahirkan.	approved	2025-07-09 20:38:54+07	100005	f4a2dc10-dcbb-416e-ac55-d0de4175ae24	\N
062d2970-b5f8-4d0c-b18c-9a0981d50b01	Pelatihan Wajib	mandatory leave	2025-04-05	2025-06-05	3	Ikut pelatihan internal perusahaan	approved	2025-07-09 20:38:54+07	100004	\N	d61a5a52-466f-479b-a2b6-7a378e2800bd
c711b5c6-6a4c-4010-a909-4e59264373c1	Keperluan Pribadi Awal Tahun	personal leave	2025-01-10	2025-01-10	4	Urusan keluarga	approved	2025-07-09 20:38:54+07	100002	\N	\N
e577274e-1919-4c8e-a221-cb89ad8c51e3	example cuti personal kontrak	personal leave	2025-06-30	2025-07-11	9	example reason	pending	2025-07-11 10:32:21+07	100004	\N	\N
0063106b-6e83-4d77-bb1e-c0dc55c91a37	Pelatihan Wajib	mandatory leave	2025-04-05	2025-04-05	1	Ikut pelatihan internal perusahaan	rejected	2025-07-09 20:38:54+07	100002	\N	d61a5a52-466f-479b-a2b6-7a378e2800bd
1w2ef	Doctor Appointment	personal leave	2025-03-10	2025-03-11	2	Medical check-up	rejected	2025-07-10 14:29:28+07	100002	\N	\N
6a5d3118-f496-498a-92d6-cafdf021ce78	Keperluan Pribadi Awal Tahun brama	personal leave	2025-01-01	2025-01-08	6	Urusan keluarga brama	pending	2025-07-16 13:19:46+07	100004	\N	\N
\.


--
-- TOC entry 4968 (class 0 OID 24897)
-- Dependencies: 222
-- Data for Name: tb_leave_log; Type: TABLE DATA; Schema: public; Owner: backend
--

COPY public.tb_leave_log (id_log, old_status, new_status, reason, changed_at, changed_by_nik, id_leave) FROM stdin;
c6189156-83f9-44eb-b839-70baf5b3b723	pending	approved	Disetujui HRD	2025-07-09 20:38:54+07	100001	bb14bd1e-4dc0-4bae-949a-8782db6b1416
35a6562d-2a21-425c-84cb-69814c7d8038	pending	approved	Disetujui sistem	2025-07-09 20:38:54+07	100001	73aefaed-be94-4b66-958d-23e16f085e08
d129b80b-b97d-40f2-b42a-318aa8afbad5	pending	approved	Disetujui oleh supervisor	2025-07-09 20:38:54+07	100001	1d5e42ad-9f31-40df-87c3-6c700d7dff41
7e04fc0a-072b-4d84-9200-ee9932144ad6	pending	approved	Disetujui HRD	2025-07-09 20:38:54+07	100002	c711b5c6-6a4c-4010-a909-4e59264373c1
eaff03f3-8a07-465e-9d26-f0c47f4d3502	pending	approved	Disetujui sistem	2025-07-09 20:38:54+07	100002	0063106b-6e83-4d77-bb1e-c0dc55c91a37
6e195d32-b5aa-4b77-b59a-bc155382424e	pending	approved	Disetujui HRD	2025-07-09 20:38:54+07	100004	e222db4b-7038-4b85-b0cc-85afa6b2f367
5e5146fe-7e6e-4091-82a4-11c59977cd0c	pending	approved	Disetujui sistem	2025-07-09 20:38:54+07	100004	062d2970-b5f8-4d0c-b18c-9a0981d50b01
b862d336-4d3a-4886-a016-05c6c857f836	pending	approved	Disetujui HRD	2025-07-09 20:38:54+07	100005	888e3488-6ddf-4789-8685-94a8afad3172
d1a9d74e-64d3-48df-b344-c3a3ec6ca33c	pending	approved	Disetujui sistem	2025-07-09 20:38:54+07	100005	6bc6fb99-0b48-451e-8f73-dad1cff1b463
0f6cddeb-4aaa-4c04-b56b-e6e2e9e5698d	pending	approved	Disetujui oleh supervisor	2025-07-09 20:38:54+07	100005	2ce30aa2-4567-472d-931f-2d20f0202ec7
c5a416b6-a57e-4d5b-ac5b-0c2bb12b5d9e	approved	rejected	disetujui oleh admin	2025-07-11 06:29:09+07	100005	c711b5c6-6a4c-4010-a909-4e59264373c1
94bd38ef-48ee-474f-94b5-af27b004e32f	rejected	approved	disetujui oleh admin	2025-07-11 07:04:59+07	100005	c711b5c6-6a4c-4010-a909-4e59264373c1
d0de887f-d13f-409b-b829-88768420bd95	approved	rejected	tidak memungkinkan	2025-07-11 09:18:27+07	100005	0063106b-6e83-4d77-bb1e-c0dc55c91a37
8e2316ed-b291-4cb8-9bc9-825e0ffc9abf	rejected	approved	okelah disetujui	2025-07-11 09:20:01+07	100005	0063106b-6e83-4d77-bb1e-c0dc55c91a37
838aeee0-a4cc-49ed-b230-8e781b57a191	approved	rejected	tidak disetujui	2025-07-11 14:07:34+07	100005	0063106b-6e83-4d77-bb1e-c0dc55c91a37
8a7e23bc-ebfe-40cc-8eb3-49ccd3f41ec1	pending	rejected	tidak disetujui	2025-07-16 11:47:16+07	100004	1w2ef
\.


--
-- TOC entry 4964 (class 0 OID 24815)
-- Dependencies: 218
-- Data for Name: tb_mandatory_leave; Type: TABLE DATA; Schema: public; Owner: backend
--

COPY public.tb_mandatory_leave (id_mandatory, title, duration, is_active, description) FROM stdin;
d61a5a52-466f-479b-a2b6-7a378e2800bd	Hari Keselamatan Kerja	1	t	Libur wajib dalam rangka pelatihan keselamatan kerja.
013f14e7-80c5-4b05-80b2-357f870cf4d3	Libur Bersama Nasional	2	f	Cuti kolektif sesuai kalender nasional (tanggal merah berganda).
776c9d61-35e7-4226-80b6-c221e2b48386	Cuti Khusus Hari Ibu	1	f	Diberikan kepada staf perempuan untuk merayakan Hari Ibu.
94684f5d-cc0f-43c2-9707-5242ad807042	sdfghj	3	f	sdg
717799df-9384-43bc-a95e-1c3ea133d814	Cuti Wajib Akhir Tahun	5	f	Berlaku untuk seluruh karyawan laki-laki dalam rangka libur akhir tahun.
dca8ad9b-4833-4dff-aa37-6d0de499ac62	Cuti Karyawan Baru	3	f	Diberikan kepada karyawan baru setelah 1 bulan masa kerja.
ed44962d-63ae-4f88-a27b-67ccdcf1655e	ghjkliuy	2	f	rtyukmnbv
1bd3d2f0-849f-464d-aabb-c407379f13bf	hghjkl	4	t	dfghjkl
4cf1af3a-f5cc-46c5-b360-46fd03a83b46	hallo	1	t	hallo
91290aeb-1ed2-4170-8f28-8436c43ed677	hksajk	1	t	gsahjl
cdc2e883-d7cf-4dfd-97d6-689672c09025	aksdkk	1	t	alkideija
1f65b6d2-5570-4a14-b04f-13ce260547e4	hallo	10	f	aksjdapow
351ff181-ce71-4a56-8168-6d03b5c91cfe	ajdsl	4	t	adwlwlaijdw
2ee7304c-1795-4749-bec5-b733f165ccde	asakdas	6	f	dalwijeijd
\.


--
-- TOC entry 4965 (class 0 OID 24823)
-- Dependencies: 219
-- Data for Name: tb_special_leave; Type: TABLE DATA; Schema: public; Owner: backend
--

COPY public.tb_special_leave (id_special, title, applicable_gender, duration, is_active, description) FROM stdin;
f4a2dc10-dcbb-416e-ac55-d0de4175ae24	Cuti Melahirkan	f	90	t	Cuti khusus untuk karyawan perempuan yang melahirkan.
80ae992c-8b63-46de-9f30-db68c3c66402	Circumcision Leave	m	6	f	Leave for parents after their child's circumcision.
967a6688-62a9-478b-9ccb-ec1674c167d9	aldlwnl	mf	3	t	daijdwja
2e717861-7d5f-443d-a76e-9e12668ac31e	hgjhjk	mf	2	f	dfghjk
121c1bc2-cb74-407e-88f8-eef5c0caf097	Cuti brama	mf	90	t	Cuti khusus untuk bramaaaaaaaaaaaaaaaaaaaaaaaaaa
\.


--
-- TOC entry 4963 (class 0 OID 24784)
-- Dependencies: 217
-- Data for Name: tb_users; Type: TABLE DATA; Schema: public; Owner: backend
--

COPY public.tb_users ("NIK", fullname, email, password, gender, role, status_active, join_date) FROM stdin;
100003	Tina Magang	tina.magang@perusahaan.com	Tina1234!	female	magang	active	2025-06-01
100005	Sari Super	sari.super@perusahaan.com	Super123!	female	super_admin	active	2023-01-10
100002	Budi Tetap	budi.tetap@perusahaan.com	Budi1234!	male	karyawan_tetap	resign	2023-11-01
100001	Rani Kontrak	rani.kontrak@perusahaan.com	Rani1234!	female	karyawan_kontrak	active	2025-07-09
100004	Andi Admin	andi.admin@perusahaan.com	Admin123!	male	admin	active	2025-07-09
100006	Agung Kontrak	agung.kontrak@perusahaan.com	agung1234!	male	karyawan_kontrak	resign	2024-07-09
100007	Sri Tetap	sri.tetap@perusahaan.com	sri1234!	female	karyawan_tetap	active	2024-04-09
100008	Andi Magang	andi.magang@perusahaan.com	andi1234!	male	magang	resign	2024-04-10
100009	Ahmad Admin	ahmad.admin@perusahaan.com	ahmad123!	male	admin	resign	2023-04-09
\.


--
-- TOC entry 4807 (class 2606 OID 24915)
-- Name: tb_balance_adjustment tb_balance_adjustment_pkey; Type: CONSTRAINT; Schema: public; Owner: backend
--

ALTER TABLE ONLY public.tb_balance_adjustment
    ADD CONSTRAINT tb_balance_adjustment_pkey PRIMARY KEY (id_adjustment);


--
-- TOC entry 4801 (class 2606 OID 24835)
-- Name: tb_balance tb_balance_pkey; Type: CONSTRAINT; Schema: public; Owner: backend
--

ALTER TABLE ONLY public.tb_balance
    ADD CONSTRAINT tb_balance_pkey PRIMARY KEY (id_balance);


--
-- TOC entry 4810 (class 2606 OID 25154)
-- Name: tb_jwt_token tb_jwt_token_pkey; Type: CONSTRAINT; Schema: public; Owner: backend
--

ALTER TABLE ONLY public.tb_jwt_token
    ADD CONSTRAINT tb_jwt_token_pkey PRIMARY KEY (access_token);


--
-- TOC entry 4805 (class 2606 OID 24903)
-- Name: tb_leave_log tb_leave_log_pkey; Type: CONSTRAINT; Schema: public; Owner: backend
--

ALTER TABLE ONLY public.tb_leave_log
    ADD CONSTRAINT tb_leave_log_pkey PRIMARY KEY (id_log);


--
-- TOC entry 4803 (class 2606 OID 24879)
-- Name: tb_leave tb_leave_pkey; Type: CONSTRAINT; Schema: public; Owner: backend
--

ALTER TABLE ONLY public.tb_leave
    ADD CONSTRAINT tb_leave_pkey PRIMARY KEY (id_leave);


--
-- TOC entry 4797 (class 2606 OID 24822)
-- Name: tb_mandatory_leave tb_mandatory_leave_pkey; Type: CONSTRAINT; Schema: public; Owner: backend
--

ALTER TABLE ONLY public.tb_mandatory_leave
    ADD CONSTRAINT tb_mandatory_leave_pkey PRIMARY KEY (id_mandatory);


--
-- TOC entry 4799 (class 2606 OID 24830)
-- Name: tb_special_leave tb_special_leave_pkey; Type: CONSTRAINT; Schema: public; Owner: backend
--

ALTER TABLE ONLY public.tb_special_leave
    ADD CONSTRAINT tb_special_leave_pkey PRIMARY KEY (id_special);


--
-- TOC entry 4793 (class 2606 OID 24789)
-- Name: tb_users tb_user_pkey; Type: CONSTRAINT; Schema: public; Owner: backend
--

ALTER TABLE ONLY public.tb_users
    ADD CONSTRAINT tb_user_pkey PRIMARY KEY ("NIK");


--
-- TOC entry 4795 (class 2606 OID 24928)
-- Name: tb_users tb_users_email_key; Type: CONSTRAINT; Schema: public; Owner: backend
--

ALTER TABLE ONLY public.tb_users
    ADD CONSTRAINT tb_users_email_key UNIQUE (email);


--
-- TOC entry 4808 (class 1259 OID 25167)
-- Name: tb_jwt_token_device_id_key; Type: INDEX; Schema: public; Owner: backend
--

CREATE UNIQUE INDEX tb_jwt_token_device_id_key ON public.tb_jwt_token USING btree (device_id);


--
-- TOC entry 4811 (class 2606 OID 24836)
-- Name: tb_balance NIK; Type: FK CONSTRAINT; Schema: public; Owner: backend
--

ALTER TABLE ONLY public.tb_balance
    ADD CONSTRAINT "NIK" FOREIGN KEY ("NIK") REFERENCES public.tb_users("NIK");


--
-- TOC entry 4812 (class 2606 OID 24880)
-- Name: tb_leave NIK; Type: FK CONSTRAINT; Schema: public; Owner: backend
--

ALTER TABLE ONLY public.tb_leave
    ADD CONSTRAINT "NIK" FOREIGN KEY ("NIK") REFERENCES public.tb_users("NIK");


--
-- TOC entry 4816 (class 2606 OID 24916)
-- Name: tb_balance_adjustment NIK; Type: FK CONSTRAINT; Schema: public; Owner: backend
--

ALTER TABLE ONLY public.tb_balance_adjustment
    ADD CONSTRAINT "NIK" FOREIGN KEY ("NIK") REFERENCES public.tb_users("NIK");


--
-- TOC entry 4817 (class 2606 OID 25155)
-- Name: tb_jwt_token NIK; Type: FK CONSTRAINT; Schema: public; Owner: backend
--

ALTER TABLE ONLY public.tb_jwt_token
    ADD CONSTRAINT "NIK" FOREIGN KEY ("NIK") REFERENCES public.tb_users("NIK");


--
-- TOC entry 4815 (class 2606 OID 24904)
-- Name: tb_leave_log id_leave; Type: FK CONSTRAINT; Schema: public; Owner: backend
--

ALTER TABLE ONLY public.tb_leave_log
    ADD CONSTRAINT id_leave FOREIGN KEY (id_leave) REFERENCES public.tb_leave(id_leave);


--
-- TOC entry 4813 (class 2606 OID 24885)
-- Name: tb_leave id_mandatory; Type: FK CONSTRAINT; Schema: public; Owner: backend
--

ALTER TABLE ONLY public.tb_leave
    ADD CONSTRAINT id_mandatory FOREIGN KEY (id_mandatory) REFERENCES public.tb_mandatory_leave(id_mandatory);


--
-- TOC entry 4814 (class 2606 OID 24890)
-- Name: tb_leave id_special; Type: FK CONSTRAINT; Schema: public; Owner: backend
--

ALTER TABLE ONLY public.tb_leave
    ADD CONSTRAINT id_special FOREIGN KEY (id_special) REFERENCES public.tb_special_leave(id_special);


-- Completed on 2025-07-18 12:44:24

--
-- PostgreSQL database dump complete
--

