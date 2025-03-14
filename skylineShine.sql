PGDMP     
    9                |           skylineShine    15.4    15.4 ;    A           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            B           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            C           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            D           1262    24684    skylineShine    DATABASE     �   CREATE DATABASE "skylineShine" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE "skylineShine";
                postgres    false            �            1259    40977    benefits    TABLE     �   CREATE TABLE public.benefits (
    id integer NOT NULL,
    service_id integer,
    benefit_1 text,
    benefit_2 text,
    benefit_3 text,
    benefit_4 text,
    benefit_5 text,
    benefit_6 text
);
    DROP TABLE public.benefits;
       public         heap    postgres    false            �            1259    40976    benefits_id_seq    SEQUENCE     �   CREATE SEQUENCE public.benefits_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.benefits_id_seq;
       public          postgres    false    227            E           0    0    benefits_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.benefits_id_seq OWNED BY public.benefits.id;
          public          postgres    false    226            �            1259    32801    booked_vehicles    TABLE     >  CREATE TABLE public.booked_vehicles (
    id integer NOT NULL,
    booking_id integer,
    make character varying(255) NOT NULL,
    model character varying(255) NOT NULL,
    year integer NOT NULL,
    num_plate character varying(255) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
 #   DROP TABLE public.booked_vehicles;
       public         heap    postgres    false            �            1259    32800    booked_vehicles_id_seq    SEQUENCE     �   CREATE SEQUENCE public.booked_vehicles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.booked_vehicles_id_seq;
       public          postgres    false    223            F           0    0    booked_vehicles_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.booked_vehicles_id_seq OWNED BY public.booked_vehicles.id;
          public          postgres    false    222            �            1259    24752    bookings    TABLE     J  CREATE TABLE public.bookings (
    id integer NOT NULL,
    user_id integer,
    service_id integer,
    location text NOT NULL,
    date date NOT NULL,
    "time" time without time zone NOT NULL,
    extra character varying(250),
    map_url character varying(255),
    created_at timestamp(0) without time zone DEFAULT now()
);
    DROP TABLE public.bookings;
       public         heap    postgres    false            �            1259    32838    bookings_contact_info    TABLE     �   CREATE TABLE public.bookings_contact_info (
    id integer NOT NULL,
    booking_id integer,
    first_name character varying(255),
    last_name character varying(255),
    email character varying(255),
    phone_number character varying(20)
);
 )   DROP TABLE public.bookings_contact_info;
       public         heap    postgres    false            �            1259    32837    bookings_contact_info_id_seq    SEQUENCE     �   CREATE SEQUENCE public.bookings_contact_info_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 3   DROP SEQUENCE public.bookings_contact_info_id_seq;
       public          postgres    false    225            G           0    0    bookings_contact_info_id_seq    SEQUENCE OWNED BY     ]   ALTER SEQUENCE public.bookings_contact_info_id_seq OWNED BY public.bookings_contact_info.id;
          public          postgres    false    224            �            1259    24751    bookings_id_seq    SEQUENCE     �   CREATE SEQUENCE public.bookings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.bookings_id_seq;
       public          postgres    false    217            H           0    0    bookings_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.bookings_id_seq OWNED BY public.bookings.id;
          public          postgres    false    216            �            1259    24782 	   countries    TABLE     �   CREATE TABLE public.countries (
    id integer NOT NULL,
    country character varying(255),
    country_code character(2),
    dial_code character varying(255)
);
    DROP TABLE public.countries;
       public         heap    postgres    false            �            1259    24781    countries_id_seq    SEQUENCE     �   CREATE SEQUENCE public.countries_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.countries_id_seq;
       public          postgres    false    219            I           0    0    countries_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.countries_id_seq OWNED BY public.countries.id;
          public          postgres    false    218            �            1259    32787    services    TABLE     �   CREATE TABLE public.services (
    id integer NOT NULL,
    short_name character varying(255),
    title character varying(255),
    subtitle text,
    description text,
    img_name character varying(255)
);
    DROP TABLE public.services;
       public         heap    postgres    false            �            1259    32786    services_id_seq1    SEQUENCE     �   CREATE SEQUENCE public.services_id_seq1
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.services_id_seq1;
       public          postgres    false    221            J           0    0    services_id_seq1    SEQUENCE OWNED BY     D   ALTER SEQUENCE public.services_id_seq1 OWNED BY public.services.id;
          public          postgres    false    220            �            1259    24697    users    TABLE     �  CREATE TABLE public.users (
    id integer NOT NULL,
    first_name character varying(45) NOT NULL,
    last_name character varying(45) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    phone_number character varying(20),
    created_on date DEFAULT now(),
    reset_token character varying(255),
    reset_token_expires timestamp without time zone,
    is_admin boolean DEFAULT false
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    24696    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    215            K           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    214            �           2604    40980    benefits id    DEFAULT     j   ALTER TABLE ONLY public.benefits ALTER COLUMN id SET DEFAULT nextval('public.benefits_id_seq'::regclass);
 :   ALTER TABLE public.benefits ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    226    227    227            �           2604    32804    booked_vehicles id    DEFAULT     x   ALTER TABLE ONLY public.booked_vehicles ALTER COLUMN id SET DEFAULT nextval('public.booked_vehicles_id_seq'::regclass);
 A   ALTER TABLE public.booked_vehicles ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    222    223    223            �           2604    24755    bookings id    DEFAULT     j   ALTER TABLE ONLY public.bookings ALTER COLUMN id SET DEFAULT nextval('public.bookings_id_seq'::regclass);
 :   ALTER TABLE public.bookings ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    217    216    217            �           2604    32841    bookings_contact_info id    DEFAULT     �   ALTER TABLE ONLY public.bookings_contact_info ALTER COLUMN id SET DEFAULT nextval('public.bookings_contact_info_id_seq'::regclass);
 G   ALTER TABLE public.bookings_contact_info ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    225    224    225            �           2604    24785    countries id    DEFAULT     l   ALTER TABLE ONLY public.countries ALTER COLUMN id SET DEFAULT nextval('public.countries_id_seq'::regclass);
 ;   ALTER TABLE public.countries ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    219    218    219            �           2604    32790    services id    DEFAULT     k   ALTER TABLE ONLY public.services ALTER COLUMN id SET DEFAULT nextval('public.services_id_seq1'::regclass);
 :   ALTER TABLE public.services ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    221    220    221            �           2604    24700    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    215    214    215            >          0    40977    benefits 
   TABLE DATA           t   COPY public.benefits (id, service_id, benefit_1, benefit_2, benefit_3, benefit_4, benefit_5, benefit_6) FROM stdin;
    public          postgres    false    227   �F       :          0    32801    booked_vehicles 
   TABLE DATA           c   COPY public.booked_vehicles (id, booking_id, make, model, year, num_plate, created_at) FROM stdin;
    public          postgres    false    223   8I       4          0    24752    bookings 
   TABLE DATA           o   COPY public.bookings (id, user_id, service_id, location, date, "time", extra, map_url, created_at) FROM stdin;
    public          postgres    false    217   �I       <          0    32838    bookings_contact_info 
   TABLE DATA           k   COPY public.bookings_contact_info (id, booking_id, first_name, last_name, email, phone_number) FROM stdin;
    public          postgres    false    225   �J       6          0    24782 	   countries 
   TABLE DATA           I   COPY public.countries (id, country, country_code, dial_code) FROM stdin;
    public          postgres    false    219   �J       8          0    32787    services 
   TABLE DATA           Z   COPY public.services (id, short_name, title, subtitle, description, img_name) FROM stdin;
    public          postgres    false    221   pT       2          0    24697    users 
   TABLE DATA           �   COPY public.users (id, first_name, last_name, email, password, phone_number, created_on, reset_token, reset_token_expires, is_admin) FROM stdin;
    public          postgres    false    215   AW       L           0    0    benefits_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.benefits_id_seq', 3, true);
          public          postgres    false    226            M           0    0    booked_vehicles_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.booked_vehicles_id_seq', 108, true);
          public          postgres    false    222            N           0    0    bookings_contact_info_id_seq    SEQUENCE SET     L   SELECT pg_catalog.setval('public.bookings_contact_info_id_seq', 107, true);
          public          postgres    false    224            O           0    0    bookings_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.bookings_id_seq', 145, true);
          public          postgres    false    216            P           0    0    countries_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.countries_id_seq', 1, false);
          public          postgres    false    218            Q           0    0    services_id_seq1    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.services_id_seq1', 1, false);
          public          postgres    false    220            R           0    0    users_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.users_id_seq', 90, true);
          public          postgres    false    214            �           2606    40984    benefits benefits_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.benefits
    ADD CONSTRAINT benefits_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.benefits DROP CONSTRAINT benefits_pkey;
       public            postgres    false    227            �           2606    32809 $   booked_vehicles booked_vehicles_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.booked_vehicles
    ADD CONSTRAINT booked_vehicles_pkey PRIMARY KEY (id);
 N   ALTER TABLE ONLY public.booked_vehicles DROP CONSTRAINT booked_vehicles_pkey;
       public            postgres    false    223            �           2606    32845 0   bookings_contact_info bookings_contact_info_pkey 
   CONSTRAINT     n   ALTER TABLE ONLY public.bookings_contact_info
    ADD CONSTRAINT bookings_contact_info_pkey PRIMARY KEY (id);
 Z   ALTER TABLE ONLY public.bookings_contact_info DROP CONSTRAINT bookings_contact_info_pkey;
       public            postgres    false    225            �           2606    24760    bookings bookings_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT bookings_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.bookings DROP CONSTRAINT bookings_pkey;
       public            postgres    false    217            �           2606    24789    countries countries_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.countries
    ADD CONSTRAINT countries_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.countries DROP CONSTRAINT countries_pkey;
       public            postgres    false    219            �           2606    32794    services services_pkey1 
   CONSTRAINT     U   ALTER TABLE ONLY public.services
    ADD CONSTRAINT services_pkey1 PRIMARY KEY (id);
 A   ALTER TABLE ONLY public.services DROP CONSTRAINT services_pkey1;
       public            postgres    false    221            �           2606    24707    users users_email_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);
 ?   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key;
       public            postgres    false    215            �           2606    24705    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    215            �           2606    40985 !   benefits benefits_service_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.benefits
    ADD CONSTRAINT benefits_service_id_fkey FOREIGN KEY (service_id) REFERENCES public.services(id);
 K   ALTER TABLE ONLY public.benefits DROP CONSTRAINT benefits_service_id_fkey;
       public          postgres    false    227    221    3223            �           2606    32810 /   booked_vehicles booked_vehicles_booking_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.booked_vehicles
    ADD CONSTRAINT booked_vehicles_booking_id_fkey FOREIGN KEY (booking_id) REFERENCES public.bookings(id) ON DELETE CASCADE;
 Y   ALTER TABLE ONLY public.booked_vehicles DROP CONSTRAINT booked_vehicles_booking_id_fkey;
       public          postgres    false    3219    223    217            �           2606    32846 ;   bookings_contact_info bookings_contact_info_booking_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.bookings_contact_info
    ADD CONSTRAINT bookings_contact_info_booking_id_fkey FOREIGN KEY (booking_id) REFERENCES public.bookings(id) ON DELETE CASCADE;
 e   ALTER TABLE ONLY public.bookings_contact_info DROP CONSTRAINT bookings_contact_info_booking_id_fkey;
       public          postgres    false    225    217    3219            �           2606    32795 !   bookings bookings_service_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT bookings_service_id_fkey FOREIGN KEY (service_id) REFERENCES public.services(id);
 K   ALTER TABLE ONLY public.bookings DROP CONSTRAINT bookings_service_id_fkey;
       public          postgres    false    3223    217    221            �           2606    24761    bookings bookings_user_id_fkey    FK CONSTRAINT     }   ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT bookings_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);
 H   ALTER TABLE ONLY public.bookings DROP CONSTRAINT bookings_user_id_fkey;
       public          postgres    false    215    217    3217            >   �  x��T�n�@='_17.-U[q�*�*@����z��x�z��];������fvm7�'8$q���7����jӼ���mI�7.�͉��t�����=�pi�U��ƽ�r=p��F[��=�qs�]$�c�]׸�K�,W�#�EG�ɧ��.�(Ch�I�<gw�د�-R����a2U�O]B�]���H��1A�i ���J���w�0������n�u��fk�e+=��]#���VN�$�anEk�"��o1��d��V�v����K]ۧH�e�	\�x����)�sl ��=�Te��J�-�c+)��!�����wl943�e)�J=J�n�k�{��t0�ғ�
�3�$e;)"��h}�:ˮ�r�Ş��'��I;�蹕�t϶
�'�9Z�{g[IS�/��h46�$$�?R���xoszzcH���ޒ������f
�[�'OU��gI����ؓ&�O�A��-�֡�.�耭��$�PPTk��N�J��6��F�X�?��W����Ap��ʈг����F����5f�l�&�Ĝ��?Q��;W����,�#���	jPSJ,���Azi�%{���~I��>
�.���Q� �D��Tizk���Z*�'1p#�=SL�_)��z���
ί� �d���K��业~�z�^�;M�      :   \   x���+�0@������$��������֬�&1�q��s���׃Di���x�,�x%��ҪF���{��M�.46������s:      4   �   x��νJ�@��z�SY��ܹw6��ED���f��M����.a�ޤ�N�oΏ��°y:��>%?�KH��ܾ�]Lcȭ*y���>/�d�������6c��uNmU��Z�c<�e/�%̩J}X��z�x���[�܏�K���=ȳ��%���7����%m����lݸ���Sn_�2�nS�� 	5�d�P���8�F�m��7�aGB��2˲o��Z�      <   ]   x�340�441������I�-(�/�L�+)JM,΁p��s3s���s�9��M�M�M-�̀ZM8�R@ʉ��mifjdb``����� -&      6   c	  x�MW�r��\W{��@oi	c�cK0׎�i��XH!���f6>gE(��ztVU�'��G]�s�+<�](_����\�(R��i�ܿʝ�*�A���k�&�U�P� �cI�@k���j��f����D�o~��D��`I�Y�P��N�Y^��Pe2��m�Kbk��=��o�B��@y����j��Q��,���P�I�e�;�����`�m%�G�K�;TJ�7�N���	]��ۇ����b�R7�z)/!t��I�c@���W#C���r���'��ϔߗ�c·����ɰ.��"�Q�)�gd�%��4Ws�?��� ��D���nϟ��OC8���R�L*NF$MW+�%��}Dѕ�'�bx�0��������=����=�OE���Ho���4{#�� UA�i[�q��M���i꺒т���**����@F`��7���;]���{�-�NFt"�U���R���F��%�������$�a��DFuY���e�l�l
�T7��=�3 ���ф��UwkTB�nȈ���*��M�[���̼G*���K��� �.�$ň���^����P@���0�{S�t�&�3@8,��_v[w��{�'�r_�lE?�d_���?迒t�����LE}�:P���
T���pyoe��*�e\�r]~�e��1bY �ߝnkP��M:[-�L��2nl� #>�E2>�5+uL�'��b@�HSe%g�@�G��ۣ�߹�`hؚʃ�e��d������)����/��vF��@ŞL��J&����w��D`q S7Bc6�H�!�椫��
3G29�X&�$�e�KZ�1	G��=��^�T&H�9i��I���*��<-�B����mh�g�Ʉ%�N�~wqv_x-�J|y���N�T�c]����qI���U(Ӌ<�h��$��θ\Ms�
�b�V��)v�f���ue��Bk�L�O�"��7��o��~�]���Sy��_����hS�t���ԗi�ˋL�q��4�'�V��4�HC����Bz*��n�����e������<IT���T��1)�R���nA&��1J:�dY7��7�I�D}��%G���a�̓Y����'�F*�evi�����U�\�#�<�!�[������T��`�{�!�:����yN�c_"s�ur�
	�*%���/����2 h	��έ�,�O�0�}��;7r�Lo����d��m�Q�� s �l��� ;��Ӎ,X�n&�K�ie�� �R?tЅDX����F���Üe�a<c��9'��PB��6:��x�Hs>��MϤ
����.e��C�p,� 0���h��5�c����ղ�/h�u���/�>,x*"¤^�����Nbp�#����<"� �Ax�4K 4�0�"���`-I�����q?�G��W��ߝ�:����@Ş�cx�n�af/�ɲ�,�;����a<��݌�/K�KY��<Đ^��h�[ږ�T�szi>{�F��[²;1�%���N����v
L�,��&7�ސ��_5��;�w�y1c��s��/�D)�8�;��|g|h���J�ݤ�
�x���+8���'��y�B+;iY�O
�C�1�����0!p�zu�"+��Ʋ2H�
�`&x�+t����gY�Z�o�U�ҳB�B��i���;�;����~�sd���>9>>3\��1�ܝI��5���!��N�̒��&�Ұ��l۞��Z�ɰt-���h���w;���Mgr�����bv��q��Dq�mn�S��`����3gj�L���f�Zr'�yn���ɸ#W�{gߍ��������M~������
���M)d �Xf"8CRB���h�>�#�-��ϭ�����Sr6
\���b2���JΛ�� y�r}��6�X�@��s���^!Nʳ���L�!�[��qs,�	v���&�����ZȂ�w�19���P�;%��"�yc{s]���Hm������<�Ѱ@nDE�����4{�u| �O�^o-#�5�UDua=�/�>��Ph�I�
�F(�/�Ue��"�B(tuu�-\��⨭3R�"�?��B�~�j�s�̅V(jHق����A*�8�;�pk,��{�w4*���Fm�I����d��])���\��z���!|�݂`�����#��C��2'BG����t��Bb�����{��H��ue[�w�O���:ˀJS؃��Z0���I& �$��?y�����˺�\�Y��CoY_��+�k�N$��FWx�l��d�Anl ?(�G��Ȇ�B�zTԵ�`��VCol�iA��� 8^r$/��݃�x�i�W� A�������O#�nn��QJ�����      8   �  x�uT�n�0<�_��$���5P�(�S���K/kj%mB�I���w��	r�h��pfv?����
,F6��oآzV[o��R��N�4���ā`ґG���H*�5���0�������%},5;��0�{q��N� -)k�P0�Al����tVk{�v3Ћ#�sVs��C��)D�	8�y֚�(��}p�B~��	8�j�bC�A0�¿�:�ga;p?�>O�9Π�F�j$�	tg۹��yp�4��*�4�}6mP��,d~�~A�]G>����ͅrvR�2CzH�^�
�[vs��NHQ��!�0��/F�I����g���j�����ϫo����D�l=|���S(�9����@&�N�����\�
�Ñ���,�Qz*h]j�p����il$ �.p س�u����\f뼪Cɇ)��E�s$���-�܁��7�3^�G��B��T.Wk�u R��)ԜsM`[�+�%azz���`��X�V	�/m�)���c�Rj���(��usF7�����$��)��/:�A4�=E��H��$�ӏ��|\m� =X�KD���6���1$?�l�(�W�#�Y�pZ��E��ȪSWq�]S��ټ�R�"o�����$�ˋ�q��J&&�r�D_%y�G�(u@߆�šeq��ƈ��N��q�A���gYr�X2	��?!GG�n5?Q���:Y�-��Y���Q&5      2   �  x���Is�@�ϣ_��o)��XƧ$kYX���e���$@��A�'��2EMї~��~��&�s���ު�R��%�x�*A���� x���7�Q3����n���{��l�[n���N_�Kl�^W6����b5��C�!��и�|s.���x�E�� ��j�E�D�Me_�gU�	w�hh�����rN��+g7;6XO��a���~r읔����7��������<ۖ��U��n�T\�E��ʌ�_�Ɂ�ci�{�<�����Z>�˝�w�vm:M���t��f������^^�1fWUxY�8Sx����GE���}|%�����;��� �i�[��soc7b��neϖ�������<��{y2,՛%�>c��� <������0�R�m�(�R^c�K���=�M���^��R[����Y�Q�1)��p��ay^�C'��T�kq���H�aR����������<�H9�,g,����
��t���?W�$[x������G��g[]�����DH�sA�b��2ШCCА#5.5NU(���B�@�!���>Ax��Ŋ�-�m<��*�c�W�du�8}�=��&��
�Q�W٘���i�����n޵��$��_d�e���BUL!�?�ЀHD$�8b��
��!�H�/�C�g:A*m9)��0T�9��0�.~�CwݩLa�hC�M�t:���S�     