<script>
    import Harf from '@Components/Harf';
    let sorular = [
            {
                soru: 'Siyah ile aynı anlama gelen bir renk.',
                cevap: 'KARA',
                soruldu: false,
            },
            {
                soru: 'Sık kullanılan bir isim.',
                cevap: 'AHMET',
                soruldu: false,
            },
            {
                soru: "Türkiye'nin başkenti",
                cevap: 'ANKARA',
                soruldu: false,
            },
            {
                soru: 'Karadenizde bir ilimiz',
                cevap: 'TRABZON',
                soruldu: false,
            },
        ],
        mesaj = null,
        mesajClass = '',
        mesajSure = null,
        mevcutSoru = null,
        harfler = [],
        puan = 0,
        harfPuan = 0,
        yarismaciCevap = '',
        tamamlandi = false,
        sure = null,
        kalanSure = 0;

    function mesajGoster(msg, tur) {
        if (mesajSure) {
            clearTimeout(mesajSure);
            mesajSure = null;
        }
        mesaj = msg;
        if (tur === 'hata') {
            mesajClass = 'bg-danger text-white';
        } else if (tur === 'basari') {
            mesajClass = 'bg-success text-white';
        } else {
            mesajClass = 'bg-dark text-white';
        }
        mesajSure = setTimeout(() => {
            mesaj = null;
        }, 3000);
    }

    function basla() {
        tamamlandi = false;
        mevcutSoru = null;
        puan = 0;
        sorular.map(x => {
            x.soruldu = false;
        });
        kalanSure = 240;
        sure = setInterval(() => {
            kalanSure--;
            if (kalanSure === 0) {
                bitir();
            }
        }, 1000);
        soruVer();
        mesajGoster('İyi yarışmalar!');
    }

    function bitir() {
        clearInterval(sure);
        mevcutSoru = null;
        tamamlandi = true;
    }
    function soruVer() {
        yarismaciCevap = '';
        mevcutSoru = sorular.find(x => !x.soruldu);
        if (!mevcutSoru) {
            bitir();
            return;
        }
        harfler = [];
        mevcutSoru.cevap.split('').map(x => {
            harfler.push({
                harf: x,
                acildi: false,
            });
        });
        harfPuan = harfler.length * 100;
        mevcutSoru.soruldu = true;
    }
    function harfVer() {
        if (harfPuan <= 100) {
            return;
        }

        let rastgeleHarfIndex = Math.floor(Math.random() * harfler.length);
        let harf = harfler[rastgeleHarfIndex];
        while (harf.acildi) {
            rastgeleHarfIndex = Math.floor(Math.random() * harfler.length);
            harf = harfler[rastgeleHarfIndex];
        }
        harf.acildi = true;
        harfler = [...harfler];
        harfPuan -= 100;
    }
    function cevapVer() {
        if (!yarismaciCevap.length) {
            return;
        }

        if (yarismaciCevap.length !== harfler.length) {
            mesajGoster('Harf sayıları tutmuyor!');
            return;
        }

        let cevap = yarismaciCevap.toLocaleUpperCase('tr');
        yarismaciCevap = cevap;

        if (yarismaciCevap === mevcutSoru.cevap.toLocaleUpperCase('tr')) {
            puan += harfPuan;
            mesajGoster('Tebrikler, doğru bildiniz!', 'basari');
        } else {
            puan -= harfPuan;
            mesajGoster(
                `Yanlış cevap, doğrusu '${mevcutSoru.cevap}' olmalıydı!`,
                'hata',
            );
        }

        soruVer();
    }
</script>

<div class="container mt-4">

    {#if tamamlandi}
        <div class="card mb-4">
            <div class="card-body">
                Tebrikler yarışmayı {puan} puan ile tamamladınız!
            </div>
        </div>
    {/if}

    {#if !mevcutSoru}
        <div class="card">
            <div class="card-header">
                <h5 class="mb-0">Kelime Oyunu Yarışmasına Hoşgeldiniz!</h5>
            </div>
            <div class="card-body">
                Yarışmaya başlamak için yarışmaya başla butonuna basın.
            </div>
            <div class="card-footer">
                <button class="btn btn-primary" on:click={basla}>
                    Yarışmaya Başla
                </button>
            </div>
        </div>
    {:else}
        <div class="card">
            <div class="card-header">
                <h3 class="mb-0">{mevcutSoru.soru}</h3>
            </div>
            <div class="card-body">
                <div class="d-flex">
                    {#each harfler as harf}
                        <Harf bind:deger={harf.harf} bind:acik={harf.acildi} />
                    {/each}
                </div>
            </div>
            <div class="card-footer">
                <div class="d-flex">
                    <div class="mr-4">Toplam Puan: {puan}</div>
                    <div class="mr-4">
                        Kalan Süreniz:
                        <kbd>{kalanSure}</kbd>
                        saniye
                    </div>
                    <div>Harf Puanı: {harfPuan}</div>
                </div>
            </div>
            <div class="card-footer">
                <div class="input-group">
                    <input
                        class="form-control"
                        type="text"
                        placeholder="Cevabınızı yazın"
                        bind:value={yarismaciCevap}
                        on:keyup={() => (yarismaciCevap = yarismaciCevap.toLocaleUpperCase('tr'))} />
                    <div class="input-group-append">
                        <button class="btn btn-secondary" on:click={harfVer}>
                            Harf Ver
                        </button>
                        <button on:click={cevapVer} class="btn btn-success">
                            Cevap Ver
                        </button>
                    </div>
                </div>
            </div>
            {#if mesaj}
                <div class="card-footer {mesajClass}">{mesaj}</div>
            {/if}

        </div>
    {/if}
</div>
