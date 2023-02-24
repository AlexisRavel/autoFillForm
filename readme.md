# AutoFillForm Project

Petit projet test. Le but est de créer un système qui, à partir d'un premier formulaire, peut compléter et soumettre un formulaire d'un autre site.
Le projet utilise la librairie [puppeteer](https://pptr.dev).

## Fonctionnement

Le dossier src contient tout le code:
* src/
	* form.html -> Le formulaire à partir duquel puppeteer remplira le formulaire cible.
	* src/app.js -> À démarrer avec Node.
* src/script
	* autoFillCible.js -> Main script. Démarre quand on soumet le formulaire de form.html.
* src/formCible
	* formulaire.php -> Un formulaire exemple, de trois champs. Les deux derniers doivent être des nombres. Lorsque le formulaire est soumit, il affiche la valeur du premier champ et le résultat de la multiplication des deux autres. Il doit être sur un serveur différent du reste l'appli (XAMPP par exemple)