import sys, re, textwrap
guia, T = sys.argv[1], sys.argv[2]
linhas = open(guia, encoding="utf-8").read().split("\n")
secao, blocos, dentro, atual = None, [], False, []
for l in linhas:
    m = re.match(r"^# (\d)\. ", l)
    if m and not dentro: secao = int(m.group(1)); continue
    if l.strip().startswith("```"):
        if dentro: blocos.append((secao, textwrap.dedent("\n".join(atual)).strip())); atual = []
        dentro = not dentro; continue
    if dentro: atual.append(l)
# o que executar: seção -> (pasta onde começa, executar?)
plano = []
for i, (sec, cod) in enumerate(blocos, 1):
    if sec == 2: acao = ("pulado", "brew install: só conferido, para não atualizar pacotes do seu Mac")
    elif sec == 6 and "ArmoryQt.py" in cod: acao = ("pulado", "a interface é aberta por você, no fim")
    else: acao = ("executa", T + "/BitcoinArmory" if sec == 4 else T)
    plano.append((i, sec, cod, acao))
out = ["set -e", 'T="%s"' % T]
for i, sec, cod, (a, x) in plano:
    if a == "pulado":
        out.append('echo "######## bloco %d (seção %d): PULADO (%s)"' % (i, sec, x)); continue
    out.append('echo "######## bloco %d (seção %d): executando em %s"' % (i, sec, x.replace(T, "$T")))
    out.append('cd "%s"' % x)
    for c in cod.split("\n"): out.append('echo "  \\$ %s"' % c.replace("\\", "\\\\").replace('"', '\\"').replace("$", "\\$"))
    out.append(cod)
    out.append('echo "  -> bloco %d OK"' % i)
open(sys.argv[3], "w").write("\n".join(out) + "\n")
print("blocos encontrados no guia: %d | executados: %d | pulados: %d" % (len(plano), sum(p[3][0]=="executa" for p in plano), sum(p[3][0]=="pulado" for p in plano)))
