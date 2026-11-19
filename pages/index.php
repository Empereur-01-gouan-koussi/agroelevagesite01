<?php
declare(strict_types=1);

$pageTitle = 'Ferme des Prés Vivants | Du champ à votre table';
$navigation = [
    'Nos élevages' => 'elevages.php',
    'Notre agriculture' => 'agriculture.php',
    'Boutique' => 'boutique.php',
    'Visites' => 'visites.php',
];
?><!doctype html>
<html lang="fr">
<head>
  <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Ferme des Prés Vivants : élevage respectueux, agriculture de saison et vente directe.">
  <title><?= htmlspecialchars($pageTitle, ENT_QUOTES, 'UTF-8') ?></title>
  <link rel="stylesheet" href="../css/styles.css">
</head>
<body>
  <header class="site-header">
    <a class="brand" href="index.php" aria-label="Accueil Prés Vivants"><span class="brand-mark">✦</span><span><strong>Prés Vivants</strong><small>ferme & élevage</small></span></a>
    <button class="menu-toggle" aria-expanded="false" aria-controls="main-nav">Menu</button>
    <nav id="main-nav" class="main-nav" aria-label="Navigation principale">
      <?php foreach ($navigation as $label => $url): ?><a href="<?= $url ?>"><?= htmlspecialchars($label, ENT_QUOTES, 'UTF-8') ?></a><?php endforeach; ?>
      <a class="nav-cta" href="admin.php">Espace admin</a>
    </nav>
  </header>
  <main id="accueil">
    <section class="hero section-shell"><div class="hero-copy reveal"><p class="eyebrow">Production locale · Depuis 1998</p><h1>Du champ à votre table, une agriculture <em>vivante.</em></h1><p class="hero-lead">À la Ferme des Prés Vivants, nous cultivons la terre et élevons nos animaux avec patience, transparence et respect du vivant.</p><div class="hero-actions"><a class="button button-primary" href="boutique.php">Découvrir nos produits <span>↗</span></a><a class="text-link" href="visites.php">Réserver une visite <span>→</span></a></div><div class="hero-note"><span class="status-dot"></span> Retrait des commandes le vendredi, de 16h à 19h</div></div><div class="hero-art reveal delay-1"><div class="sun"></div><div class="hill hill-back"></div><div class="hill hill-front"></div><div class="barn"><span></span></div><div class="cow"><i></i><b></b><strong></strong></div><div class="grass grass-one"></div><div class="grass grass-two"></div><p class="art-caption">Le pré des vaches allaitantes<br><small>à l’aube, côté verger</small></p></div></section>
    <section class="intro section-shell reveal"><div class="section-label">01 / La ferme</div><div class="intro-grid"><h2>Une ferme à taille humaine, tournée vers <em>l’essentiel.</em></h2><div><p>Nous produisons des légumes de saison et élevons des vaches, des moutons et des poules pondeuses.</p><p>Chaque jour, nous cherchons le juste équilibre entre la terre, les animaux et les personnes qui font vivre la ferme.</p><a class="text-link" href="elevages.php">Découvrir nos élevages <span>→</span></a></div></div></section>
    <section class="dark-band"><div class="section-shell"><div class="section-heading reveal"><div><div class="section-label light">02 / Nos engagements</div><h2>Une agriculture<br><em>qui crée du lien.</em></h2></div><p>Des pratiques attentives, des produits locaux et une ferme ouverte sur son territoire.</p></div><div class="animal-grid"><article class="animal-card cow-card reveal"><div class="animal-icon">♧</div><h3>Élevage attentif</h3><p>Des animaux suivis au quotidien et élevés dans le respect de leurs besoins.</p></article><article class="animal-card sheep-card reveal delay-1"><div class="animal-icon">◌</div><h3>Produits locaux</h3><p>Des récoltes de saison et une vente directe qui rapproche la ferme de votre table.</p></article><article class="animal-card hen-card reveal delay-2"><div class="animal-icon">✦</div><h3>Ferme ouverte</h3><p>Des visites pédagogiques pour comprendre le travail agricole et le vivant.</p></article></div></div></section>
    <section class="shop section-shell"><div class="shop-top reveal"><div><div class="section-label">03 / Vente directe</div><h2>Le panier de la<br><em>semaine.</em></h2></div><p>Commandez en ligne puis retirez vos produits à la ferme.</p></div><a class="button button-primary" href="boutique.php">Voir la boutique <span>↗</span></a></section>
  </main>
  <footer class="site-footer"><div class="section-shell footer-inner"><div class="brand"><span class="brand-mark">✦</span><span><strong>Prés Vivants</strong><small>ferme & élevage</small></span></div><p>Une agriculture locale, un élevage attentif,<br>des produits qui ont une histoire.</p><div class="footer-links"><a href="boutique.php">Boutique</a><a href="visites.php">Visites</a><a href="contact.php">Contact</a></div><small class="copyright">© <?= date('Y') ?> Prés Vivants</small></div></footer>
  <script src="../js/script.js"></script>
</body>
</html>
