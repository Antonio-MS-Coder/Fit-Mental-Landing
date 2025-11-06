/**
 * Script de Limpieza para FitMental Admin
 *
 * Este script:
 * 1. Identifica duplicados por título
 * 2. Corrige campos 'type' incorrectos (song → meditation)
 * 3. Muestra duplicados y permite eliminarlos
 *
 * INSTRUCCIONES:
 * 1. Abre el panel de admin (app-admin.html)
 * 2. Abre la consola del navegador (F12 o Cmd+Option+J)
 * 3. Copia y pega TODO este código
 * 4. Presiona Enter
 * 5. Sigue las instrucciones en la consola
 */

(async function cleanupMeditations() {
    console.log('🧹 Iniciando limpieza de meditaciones...\n');

    try {
        // Verificar que Firebase esté disponible
        if (!window.firebaseDb || !window.firebaseGetDocs || !window.firebaseCollection) {
            console.error('❌ Error: Firebase no está disponible. Asegúrate de ejecutar este script en la página del admin panel.');
            return;
        }

        // 1. Cargar todas las meditaciones
        console.log('📥 Cargando meditaciones desde Firestore...');
        const snapshot = await window.firebaseGetDocs(
            window.firebaseCollection(window.firebaseDb, 'meditaciones')
        );

        const allMeditations = [];
        snapshot.forEach((doc) => {
            allMeditations.push({ id: doc.id, ...doc.data() });
        });

        console.log(`✅ Cargadas ${allMeditations.length} meditaciones\n`);

        // 2. Identificar duplicados por título
        console.log('🔍 Buscando duplicados...');
        const titleGroups = {};

        allMeditations.forEach(med => {
            const title = (med.title || '').trim();
            if (!titleGroups[title]) {
                titleGroups[title] = [];
            }
            titleGroups[title].push(med);
        });

        const duplicates = Object.entries(titleGroups).filter(([title, meds]) => meds.length > 1);

        if (duplicates.length > 0) {
            console.log(`⚠️  Encontrados ${duplicates.length} títulos duplicados:\n`);
            duplicates.forEach(([title, meds]) => {
                console.log(`📌 "${title}" - ${meds.length} copias:`);
                meds.forEach(med => {
                    console.log(`   • ID: ${med.id}`);
                    console.log(`     Tipo: ${med.type || 'no definido'}`);
                    console.log(`     Categoría: ${med.category || 'no definida'}`);
                    console.log(`     Access: ${med.accessType || 'no definido'}`);
                    console.log(`     Activo: ${med.isActive !== false ? 'Sí' : 'No'}`);
                    console.log('');
                });
            });
        } else {
            console.log('✅ No se encontraron duplicados\n');
        }

        // 3. Identificar campos 'type' incorrectos
        console.log('🔍 Buscando campos "type" incorrectos...');
        const incorrectTypes = allMeditations.filter(med => {
            // Si está en la colección 'meditaciones' pero tiene type: 'song', es incorrecto
            return med.type && med.type.toLowerCase() === 'song';
        });

        if (incorrectTypes.length > 0) {
            console.log(`⚠️  Encontradas ${incorrectTypes.length} meditaciones con type incorrecto:\n`);
            incorrectTypes.forEach(med => {
                console.log(`   • "${med.title}" (ID: ${med.id})`);
                console.log(`     Type actual: "${med.type}" → Debería ser: "meditation"`);
                console.log('');
            });
        } else {
            console.log('✅ Todos los tipos están correctos\n');
        }

        // 4. Proporcionar funciones para corregir
        console.log('\n📋 FUNCIONES DISPONIBLES:\n');

        // Función para corregir tipos
        window.fixIncorrectTypes = async function() {
            console.log('🔧 Corrigiendo tipos incorrectos...');
            let fixed = 0;

            for (const med of incorrectTypes) {
                try {
                    await window.firebaseUpdateDoc(
                        window.firebaseDoc(window.firebaseDb, 'meditaciones', med.id),
                        {
                            type: 'meditation',
                            updatedAt: window.firebaseServerTimestamp()
                        }
                    );
                    console.log(`✅ Corregido: "${med.title}" (${med.id})`);
                    fixed++;
                } catch (error) {
                    console.error(`❌ Error al corregir "${med.title}":`, error);
                }
            }

            console.log(`\n✅ ${fixed} meditaciones corregidas`);
            console.log('🔄 Recarga la página para ver los cambios');
        };

        // Función para eliminar un duplicado específico
        window.deleteMeditationById = async function(id) {
            try {
                await window.firebaseDeleteDoc(
                    window.firebaseDoc(window.firebaseDb, 'meditaciones', id)
                );
                console.log(`✅ Meditación eliminada: ${id}`);
                console.log('🔄 Recarga la página para ver los cambios');
            } catch (error) {
                console.error(`❌ Error al eliminar:`, error);
            }
        };

        // Función para eliminar duplicados automáticamente (mantiene el primero)
        window.autoDeleteDuplicates = async function() {
            console.log('⚠️  ATENCIÓN: Esta función eliminará automáticamente los duplicados');
            console.log('    Se mantendrá el primer documento de cada grupo\n');

            const confirm = window.confirm(
                `¿Estás seguro de que quieres eliminar ${duplicates.reduce((sum, [_, meds]) => sum + meds.length - 1, 0)} documentos duplicados?\n\n` +
                'Esta acción NO se puede deshacer.'
            );

            if (!confirm) {
                console.log('❌ Operación cancelada');
                return;
            }

            let deleted = 0;
            for (const [title, meds] of duplicates) {
                // Mantener el primero, eliminar el resto
                const toDelete = meds.slice(1);

                for (const med of toDelete) {
                    try {
                        await window.firebaseDeleteDoc(
                            window.firebaseDoc(window.firebaseDb, 'meditaciones', med.id)
                        );
                        console.log(`✅ Eliminado duplicado de "${title}": ${med.id}`);
                        deleted++;
                    } catch (error) {
                        console.error(`❌ Error al eliminar ${med.id}:`, error);
                    }
                }
            }

            console.log(`\n✅ ${deleted} duplicados eliminados`);
            console.log('🔄 Recarga la página para ver los cambios');
        };

        // Función para ver detalles de una meditación
        window.showMeditationDetails = function(id) {
            const med = allMeditations.find(m => m.id === id);
            if (!med) {
                console.log('❌ Meditación no encontrada');
                return;
            }
            console.log('\n📄 Detalles de la meditación:\n');
            console.log(JSON.stringify(med, null, 2));
        };

        // Mostrar instrucciones
        console.log('1️⃣  fixIncorrectTypes()');
        console.log('   → Corrige automáticamente todos los campos "type" incorrectos\n');

        console.log('2️⃣  deleteMeditationById("ID_AQUI")');
        console.log('   → Elimina una meditación específica por su ID\n');

        console.log('3️⃣  autoDeleteDuplicates()');
        console.log('   → Elimina AUTOMÁTICAMENTE todos los duplicados (mantiene el primero de cada grupo)\n');

        console.log('4️⃣  showMeditationDetails("ID_AQUI")');
        console.log('   → Muestra todos los detalles de una meditación\n');

        console.log('💡 RECOMENDACIÓN:');
        console.log('   1. Primero ejecuta: fixIncorrectTypes()');
        console.log('   2. Luego ejecuta: autoDeleteDuplicates()');
        console.log('   3. O elimina manualmente con: deleteMeditationById("ID")\n');

    } catch (error) {
        console.error('❌ Error durante la limpieza:', error);
    }
})();
