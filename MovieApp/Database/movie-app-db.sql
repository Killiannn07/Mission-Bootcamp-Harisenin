--
-- PostgreSQL database dump
--

\restrict 8XOHX9zlZep6J5thHypwPX0hTMtrZoFUehwiIjmgkTAXIeag5PiXVzzP5YBb66q

-- Dumped from database version 18.2
-- Dumped by pg_dump version 18.2

-- Started on 2026-08-20 21:49:41

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 221 (class 1259 OID 32902)
-- Name: content; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.content (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    description text,
    thumbnail character varying(255),
    release_year integer,
    rating numeric(2,1),
    age_rating character varying(10),
    duration integer,
    type character varying(20),
    badge character varying(20),
    new_release boolean,
    top_ten boolean
);


ALTER TABLE public.content OWNER TO postgres;

--
-- TOC entry 230 (class 1259 OID 32996)
-- Name: content_genre; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.content_genre (
    content_id integer NOT NULL,
    genre_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.content_genre OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 32901)
-- Name: content_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.content_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.content_id_seq OWNER TO postgres;

--
-- TOC entry 5065 (class 0 OID 0)
-- Dependencies: 220
-- Name: content_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.content_id_seq OWNED BY public.content.id;


--
-- TOC entry 232 (class 1259 OID 33015)
-- Name: daftar_saya; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.daftar_saya (
    id integer NOT NULL,
    user_id integer NOT NULL,
    content_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.daftar_saya OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 33014)
-- Name: daftar_saya_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.daftar_saya_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.daftar_saya_id_seq OWNER TO postgres;

--
-- TOC entry 5066 (class 0 OID 0)
-- Dependencies: 231
-- Name: daftar_saya_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.daftar_saya_id_seq OWNED BY public.daftar_saya.id;


--
-- TOC entry 227 (class 1259 OID 32967)
-- Name: episodes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.episodes (
    id integer NOT NULL,
    content_id integer NOT NULL,
    episode_number integer NOT NULL,
    title character varying(200) NOT NULL,
    description text,
    duration integer,
    video_url character varying(255)
);


ALTER TABLE public.episodes OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 32966)
-- Name: episodes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.episodes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.episodes_id_seq OWNER TO postgres;

--
-- TOC entry 5067 (class 0 OID 0)
-- Dependencies: 226
-- Name: episodes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.episodes_id_seq OWNED BY public.episodes.id;


--
-- TOC entry 229 (class 1259 OID 32985)
-- Name: genre; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.genre (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.genre OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 32984)
-- Name: genre_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.genre_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.genre_id_seq OWNER TO postgres;

--
-- TOC entry 5068 (class 0 OID 0)
-- Dependencies: 228
-- Name: genre_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.genre_id_seq OWNED BY public.genre.id;


--
-- TOC entry 225 (class 1259 OID 32943)
-- Name: orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orders (
    id integer NOT NULL,
    user_id integer NOT NULL,
    package_id integer NOT NULL,
    order_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    start_at timestamp without time zone NOT NULL,
    end_at timestamp without time zone NOT NULL,
    status character varying(20),
    CONSTRAINT orders_status_check CHECK (((status)::text = ANY ((ARRAY['pending'::character varying, 'active'::character varying, 'expired'::character varying, 'cancelled'::character varying])::text[])))
);


ALTER TABLE public.orders OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 32942)
-- Name: orders_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.orders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.orders_id_seq OWNER TO postgres;

--
-- TOC entry 5069 (class 0 OID 0)
-- Dependencies: 224
-- Name: orders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.orders_id_seq OWNED BY public.orders.id;


--
-- TOC entry 219 (class 1259 OID 24712)
-- Name: packages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.packages (
    id integer NOT NULL,
    name character varying(200),
    price integer,
    duration_day integer
);


ALTER TABLE public.packages OWNER TO postgres;

--
-- TOC entry 234 (class 1259 OID 33037)
-- Name: payments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.payments (
    id integer NOT NULL,
    order_id integer NOT NULL,
    method character varying(50),
    amount numeric(10,2),
    payment_date timestamp without time zone,
    status character varying(20),
    transaction_id character varying(100),
    CONSTRAINT payments_status_check CHECK (((status)::text = ANY ((ARRAY['pending'::character varying, 'success'::character varying, 'failed'::character varying])::text[])))
);


ALTER TABLE public.payments OWNER TO postgres;

--
-- TOC entry 233 (class 1259 OID 33036)
-- Name: payments_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.payments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.payments_id_seq OWNER TO postgres;

--
-- TOC entry 5070 (class 0 OID 0)
-- Dependencies: 233
-- Name: payments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.payments_id_seq OWNED BY public.payments.id;


--
-- TOC entry 223 (class 1259 OID 32926)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    password character varying(255) NOT NULL,
    role character varying(20) DEFAULT 'user'::character varying,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    is_verified boolean DEFAULT false NOT NULL,
    verification_token text,
    reset_password_token text,
    reset_password_expires timestamp without time zone,
    CONSTRAINT users_role_check CHECK (((role)::text = ANY ((ARRAY['user'::character varying, 'admin'::character varying])::text[])))
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 32925)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 5071 (class 0 OID 0)
-- Dependencies: 222
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 4847 (class 2604 OID 32905)
-- Name: content id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.content ALTER COLUMN id SET DEFAULT nextval('public.content_id_seq'::regclass);


--
-- TOC entry 4859 (class 2604 OID 33018)
-- Name: daftar_saya id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.daftar_saya ALTER COLUMN id SET DEFAULT nextval('public.daftar_saya_id_seq'::regclass);


--
-- TOC entry 4855 (class 2604 OID 32970)
-- Name: episodes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.episodes ALTER COLUMN id SET DEFAULT nextval('public.episodes_id_seq'::regclass);


--
-- TOC entry 4856 (class 2604 OID 32988)
-- Name: genre id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.genre ALTER COLUMN id SET DEFAULT nextval('public.genre_id_seq'::regclass);


--
-- TOC entry 4853 (class 2604 OID 32946)
-- Name: orders id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders ALTER COLUMN id SET DEFAULT nextval('public.orders_id_seq'::regclass);


--
-- TOC entry 4861 (class 2604 OID 33040)
-- Name: payments id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payments ALTER COLUMN id SET DEFAULT nextval('public.payments_id_seq'::regclass);


--
-- TOC entry 4848 (class 2604 OID 32929)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 5046 (class 0 OID 32902)
-- Dependencies: 221
-- Data for Name: content; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.content (id, title, description, thumbnail, release_year, rating, age_rating, duration, type, badge, new_release, top_ten) FROM stdin;
14	test final	\N	http://localhost:5173/images/potrait1.png	2022	4.0	13+	22	movie	\N	f	f
15	aaaa	\N	http://localhost:5173/images/potrait2.png	2022	5.0	13+	80	movie	New Episode	t	f
16	aaaa	\N	http://localhost:5173/images/potrait5.png	2022	4.0	13+	22	movie	New Episode	t	f
17	Dilan	\N	http://localhost:5173/images/potrait10.png	2018	7.0	13+	100	movie	\N	t	f
18	search	\N	http://localhost:5173/images/potrait8.png	1999	6.0	13+	22	movie	New Episode	t	f
\.


--
-- TOC entry 5055 (class 0 OID 32996)
-- Dependencies: 230
-- Data for Name: content_genre; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.content_genre (content_id, genre_id, created_at) FROM stdin;
17	1	2026-08-20 18:41:52.438638
17	2	2026-08-20 18:41:52.438638
17	7	2026-08-20 18:41:52.438638
\.


--
-- TOC entry 5057 (class 0 OID 33015)
-- Dependencies: 232
-- Data for Name: daftar_saya; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.daftar_saya (id, user_id, content_id, created_at) FROM stdin;
\.


--
-- TOC entry 5052 (class 0 OID 32967)
-- Dependencies: 227
-- Data for Name: episodes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.episodes (id, content_id, episode_number, title, description, duration, video_url) FROM stdin;
\.


--
-- TOC entry 5054 (class 0 OID 32985)
-- Dependencies: 229
-- Data for Name: genre; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.genre (id, name, created_at) FROM stdin;
1	Action	2026-07-20 13:26:19.321929
2	Adventure	2026-07-20 13:26:19.321929
3	Comedy	2026-07-20 13:26:19.321929
4	Animation	2026-07-20 13:26:19.321929
5	Drama	2026-07-20 13:26:19.321929
6	Romance	2026-07-20 13:26:19.321929
7	Sci-Fi	2026-07-20 13:26:19.321929
8	Fantasy	2026-07-20 13:26:19.321929
9	Horror	2026-07-20 13:26:19.321929
\.


--
-- TOC entry 5050 (class 0 OID 32943)
-- Dependencies: 225
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.orders (id, user_id, package_id, order_at, start_at, end_at, status) FROM stdin;
\.


--
-- TOC entry 5044 (class 0 OID 24712)
-- Dependencies: 219
-- Data for Name: packages; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.packages (id, name, price, duration_day) FROM stdin;
\.


--
-- TOC entry 5059 (class 0 OID 33037)
-- Dependencies: 234
-- Data for Name: payments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.payments (id, order_id, method, amount, payment_date, status, transaction_id) FROM stdin;
\.


--
-- TOC entry 5048 (class 0 OID 32926)
-- Dependencies: 223
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, email, password, role, created_at, updated_at, is_verified, verification_token, reset_password_token, reset_password_expires) FROM stdin;
1	ian	sofyan@example.com	$2b$12$5tP/YNqZoW.vc6/zIoTrd.NTbfaaZx0K9Tgczmyik1IIe/ebyCEkK	user	2026-08-13 19:11:14.501353	2026-08-13 19:11:14.501353	f	\N	\N	\N
2	admin	admin@gmail.com	$2b$12$FZj108QbbjAEY11eIyTSg.Ms23nK7lLKJ9m3PvC6r6bA8Xalcur7a	admin	2026-08-15 09:32:24.260623	2026-08-15 09:32:24.260623	t	\N	\N	\N
9	Killiannn	syunianto123@gmail.com	$2b$12$7kAxUJhbUeD/CvmGlONaD.s2af0.JTGEaOd62ivizLXd3EON.aAWC	user	2026-08-15 13:17:31.757748	2026-08-15 14:45:25.06624	t	\N	\N	\N
\.


--
-- TOC entry 5072 (class 0 OID 0)
-- Dependencies: 220
-- Name: content_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.content_id_seq', 18, true);


--
-- TOC entry 5073 (class 0 OID 0)
-- Dependencies: 231
-- Name: daftar_saya_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.daftar_saya_id_seq', 1, false);


--
-- TOC entry 5074 (class 0 OID 0)
-- Dependencies: 226
-- Name: episodes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.episodes_id_seq', 1, false);


--
-- TOC entry 5075 (class 0 OID 0)
-- Dependencies: 228
-- Name: genre_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.genre_id_seq', 9, true);


--
-- TOC entry 5076 (class 0 OID 0)
-- Dependencies: 224
-- Name: orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.orders_id_seq', 1, false);


--
-- TOC entry 5077 (class 0 OID 0)
-- Dependencies: 233
-- Name: payments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.payments_id_seq', 1, false);


--
-- TOC entry 5078 (class 0 OID 0)
-- Dependencies: 222
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 9, true);


--
-- TOC entry 4882 (class 2606 OID 33003)
-- Name: content_genre content_genre_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.content_genre
    ADD CONSTRAINT content_genre_pkey PRIMARY KEY (content_id, genre_id);


--
-- TOC entry 4868 (class 2606 OID 32911)
-- Name: content content_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.content
    ADD CONSTRAINT content_pkey PRIMARY KEY (id);


--
-- TOC entry 4884 (class 2606 OID 33024)
-- Name: daftar_saya daftar_saya_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.daftar_saya
    ADD CONSTRAINT daftar_saya_pkey PRIMARY KEY (id);


--
-- TOC entry 4876 (class 2606 OID 32978)
-- Name: episodes episodes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.episodes
    ADD CONSTRAINT episodes_pkey PRIMARY KEY (id);


--
-- TOC entry 4878 (class 2606 OID 32995)
-- Name: genre genre_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.genre
    ADD CONSTRAINT genre_name_key UNIQUE (name);


--
-- TOC entry 4880 (class 2606 OID 32993)
-- Name: genre genre_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.genre
    ADD CONSTRAINT genre_pkey PRIMARY KEY (id);


--
-- TOC entry 4874 (class 2606 OID 32955)
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- TOC entry 4866 (class 2606 OID 24717)
-- Name: packages packages_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.packages
    ADD CONSTRAINT packages_pkey PRIMARY KEY (id);


--
-- TOC entry 4886 (class 2606 OID 33047)
-- Name: payments payments_order_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT payments_order_id_key UNIQUE (order_id);


--
-- TOC entry 4888 (class 2606 OID 33045)
-- Name: payments payments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT payments_pkey PRIMARY KEY (id);


--
-- TOC entry 4870 (class 2606 OID 32941)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 4872 (class 2606 OID 32939)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 4892 (class 2606 OID 33004)
-- Name: content_genre content_genre_content_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.content_genre
    ADD CONSTRAINT content_genre_content_id_fkey FOREIGN KEY (content_id) REFERENCES public.content(id) ON DELETE CASCADE;


--
-- TOC entry 4893 (class 2606 OID 33009)
-- Name: content_genre content_genre_genre_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.content_genre
    ADD CONSTRAINT content_genre_genre_id_fkey FOREIGN KEY (genre_id) REFERENCES public.genre(id) ON DELETE CASCADE;


--
-- TOC entry 4894 (class 2606 OID 33030)
-- Name: daftar_saya daftar_saya_content_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.daftar_saya
    ADD CONSTRAINT daftar_saya_content_id_fkey FOREIGN KEY (content_id) REFERENCES public.content(id) ON DELETE CASCADE;


--
-- TOC entry 4895 (class 2606 OID 33025)
-- Name: daftar_saya daftar_saya_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.daftar_saya
    ADD CONSTRAINT daftar_saya_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- TOC entry 4891 (class 2606 OID 32979)
-- Name: episodes episodes_content_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.episodes
    ADD CONSTRAINT episodes_content_id_fkey FOREIGN KEY (content_id) REFERENCES public.content(id) ON DELETE CASCADE;


--
-- TOC entry 4889 (class 2606 OID 32961)
-- Name: orders orders_package_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_package_id_fkey FOREIGN KEY (package_id) REFERENCES public.packages(id);


--
-- TOC entry 4890 (class 2606 OID 32956)
-- Name: orders orders_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 4896 (class 2606 OID 33048)
-- Name: payments payments_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT payments_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id) ON DELETE CASCADE;


-- Completed on 2026-08-20 21:49:41

--
-- PostgreSQL database dump complete
--

\unrestrict 8XOHX9zlZep6J5thHypwPX0hTMtrZoFUehwiIjmgkTAXIeag5PiXVzzP5YBb66q

