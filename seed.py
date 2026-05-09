"""
Popula o banco de dados com os mesmos dados do mockData.ts original.
As imageUrls apontam para o endpoint /api/assets/<filename> que serve
as imagens da pasta public/assets do frontend.
"""
from database import db, Module, Lesson, Exercise, ExerciseOption, Achievement


# URLs base das imagens servidas pelo Flask (ver rota /api/assets)
LETTER_A = "/api/assets/letter-a.png"
CAT_IMG  = "/api/assets/cat.png"
DOG_IMG  = "/api/assets/dog.png"
HOUSE_IMG = "/api/assets/house.png"
SUN_IMG  = "/api/assets/sun.png"


def seed_database():
    """Insere dados apenas se o banco estiver vazio."""
    if Module.query.count() > 0:
        return  # já populado, não duplica

    # ── Módulos ────────────────────────────────────────────────────────────────
    modules = [
        Module(id="1", title="Letras",   icon="🔤", description="Aprenda as letras do alfabeto", color="bg-primary",   lessons_count=5, completed_lessons=2),
        Module(id="2", title="Sílabas",  icon="📝", description="Junte as letras em sílabas",    color="bg-secondary", lessons_count=4, completed_lessons=0),
        Module(id="3", title="Palavras", icon="📖", description="Forme suas primeiras palavras",  color="bg-accent",    lessons_count=6, completed_lessons=0),
        Module(id="4", title="Frases",   icon="💬", description="Construa frases simples",        color="bg-warning",   lessons_count=4, completed_lessons=0),
    ]
    db.session.add_all(modules)

    # ── Lições ─────────────────────────────────────────────────────────────────
    lessons = [
        Lesson(id="l1", module_id="1", title="Letra A", content_type="letra",   image_url=LETTER_A,  text_content="A",    order_index=1),
        Lesson(id="l2", module_id="1", title="Letra B", content_type="letra",   image_url=LETTER_A,  text_content="B",    order_index=2),
        Lesson(id="l3", module_id="1", title="Letra C", content_type="letra",   image_url=LETTER_A,  text_content="C",    order_index=3),
        Lesson(id="l4", module_id="3", title="Gato",    content_type="palavra", image_url=CAT_IMG,   text_content="GATO", order_index=1),
        Lesson(id="l5", module_id="3", title="Casa",    content_type="palavra", image_url=HOUSE_IMG, text_content="CASA", order_index=2),
        Lesson(id="l6", module_id="3", title="Sol",     content_type="palavra", image_url=SUN_IMG,   text_content="SOL",  order_index=3),
    ]
    db.session.add_all(lessons)

    # ── Exercícios ─────────────────────────────────────────────────────────────
    exercises = [
        Exercise(id="e1", lesson_id="l1", type="multiple_choice", question_text="Qual é a letra A?"),
        Exercise(id="e2", lesson_id="l4", type="multiple_choice", question_text="Onde está o GATO?"),
    ]
    db.session.add_all(exercises)

    # ── Opções dos exercícios ──────────────────────────────────────────────────
    options = [
        ExerciseOption(id="o1", exercise_id="e1", content="A",        image_url=LETTER_A,  is_correct=True),
        ExerciseOption(id="o2", exercise_id="e1", content="B",        image_url=DOG_IMG,   is_correct=False),
        ExerciseOption(id="o3", exercise_id="e1", content="C",        image_url=HOUSE_IMG, is_correct=False),
        ExerciseOption(id="o4", exercise_id="e2", content="Cachorro", image_url=DOG_IMG,   is_correct=False),
        ExerciseOption(id="o5", exercise_id="e2", content="Gato",     image_url=CAT_IMG,   is_correct=True),
        ExerciseOption(id="o6", exercise_id="e2", content="Casa",     image_url=HOUSE_IMG, is_correct=False),
    ]
    db.session.add_all(options)

    # ── Conquistas ─────────────────────────────────────────────────────────────
    achievements = [
        Achievement(id="a1", title="Primeira Aula",   icon="⭐", unlocked=True),
        Achievement(id="a2", title="5 Acertos",       icon="🎯", unlocked=True),
        Achievement(id="a3", title="Módulo Completo", icon="🏆", unlocked=False),
        Achievement(id="a4", title="Sem Erros",       icon="💎", unlocked=False),
        Achievement(id="a5", title="7 Dias Seguidos", icon="🔥", unlocked=False),
        Achievement(id="a6", title="Todas as Letras", icon="🎓", unlocked=False),
    ]
    db.session.add_all(achievements)

    db.session.commit()
    print("✅  Banco populado com sucesso!")
