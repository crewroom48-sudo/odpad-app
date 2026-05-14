// STAČÍ CELÉ SKOPÍROVAŤ DO APP.JS V EXPO SNACK

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  StatusBar,
  ScrollView,
  TextInput,
  Modal,
} from 'react-native';

import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

const accentColor = '#3b82f6';
const backgroundColor = '#ffffff';
const cardColor = '#f5f5f5';
const textPrimary = '#0a0a0a';
const textSecondary = '#737373';

const DEFAULT_ITEMS = [
  { type: 'header', label: 'Kuchyňa' },
  { type: 'item', label: 'Premier' },
  { type: 'item', label: 'Value' },
  { type: 'item', label: 'Nuggetky' },
  { type: 'item', label: 'Strips' },
  { type: 'item', label: 'McCrispy' },
  { type: 'item', label: 'Gouda' },
  { type: 'item', label: '10:1' },
  { type: 'item', label: '4:1' },
  { type: 'item', label: 'Krevety' },
  { type: 'item', label: 'Taštička Malina' },
  { type: 'item', label: 'Taštička Jablko' },
  { type: 'item', label: 'Malá Tortila' },
  { type: 'item', label: 'Veľká Tortila' },
  { type: 'item', label: 'Rg Žemla' },
  { type: 'item', label: 'Qp Žemla' },
  { type: 'item', label: 'Bm Žemla' },
  { type: 'item', label: 'McCrispy Žemla' },
  { type: 'item', label: 'Bezlepková' },
  { type: 'item', label: 'Cheddar Žltý' },
  { type: 'item', label: 'Cheddar Biely' },
  { type: 'item', label: 'Filet-O-Fish' },

  { type: 'header', label: 'Servis' },
  { type: 'item', label: 'Croissant' },
  { type: 'item', label: 'Banna Bread' },
  { type: 'item', label: 'Srdiečka' },
  { type: 'item', label: 'Šiška Nugát' },
  { type: 'item', label: 'Šiška Marhuľa' },
  { type: 'item', label: 'Šiška Dubai' },
  { type: 'item', label: 'Mlieko Barista' },
  { type: 'item', label: 'Tripple Cookie' },
  { type: 'item', label: 'Muffin Čerešňa' },
  { type: 'item', label: 'Muffin Káva' },
  { type: 'item', label: 'Croissant Čokoláda' },
  { type: 'item', label: 'Pork' },

  { type: 'header', label: 'Raňajky' },
  { type: 'item', label: 'Guacamole' },
  { type: 'item', label: 'Šunka nudličky' },
  { type: 'item', label: 'Šunka plátky' },
  { type: 'item', label: 'Hasbrown' },
  { type: 'item', label: 'English Muffin' },
  { type: 'item', label: 'Bagel' },
  { type: 'item', label: 'Lievance' },
  { type: 'item', label: 'Vajcia' },
  { type: 'item', label: 'Lučina' },
  { type: 'item', label: 'Pribinačik' },
];

function CounterScreen() {
  const insets = useSafeAreaInsets();

  const [items, setItems] =
    useState(DEFAULT_ITEMS);

  const [values, setValues] =
    useState({});

  const [modalVisible, setModalVisible] =
    useState(false);

  const [newProduct, setNewProduct] =
    useState('');

  const [newCategory, setNewCategory] =
    useState('Kuchyňa');

  const [editIndex, setEditIndex] =
    useState(null);

  const [
    passwordModalVisible,
    setPasswordModalVisible,
  ] = useState(false);

  const [passwordInput, setPasswordInput] =
    useState('');

  const [pendingAction, setPendingAction] =
    useState(null);

  const handleChangeValue = (
    key,
    text
  ) => {
    setValues((prev) => ({
      ...prev,
      [key]: text,
    }));
  };

  const handleIncrement = (key) => {
    setValues((prev) => {
      const current =
        parseFloat(prev[key]) || 0;

      return {
        ...prev,
        [key]: String(current + 1),
      };
    });
  };

  const handleDecrement = (key) => {
    setValues((prev) => {
      const current =
        parseFloat(prev[key]) || 0;

      return {
        ...prev,
        [key]:
          current > 0
            ? String(current - 1)
            : '',
      };
    });
  };

  const handleResetAll = () => {
    Alert.alert(
      'Reset',
      'Reset all values?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: () => setValues({}),
        },
      ]
    );
  };

  const requestProtectedAction = (
    action
  ) => {
    setPendingAction(() => action);
    setPasswordInput('');
    setPasswordModalVisible(true);
  };

  const verifyPassword = () => {
    if (passwordInput === '2587') {
      setPasswordModalVisible(false);

      if (pendingAction) {
        pendingAction();
      }

      setPasswordInput('');
      setPendingAction(null);
    } else {
      Alert.alert(
        'Nesprávne heslo',
        'Zadané heslo nie je správne.'
      );
    }
  };

  const openAddModal = () => {
    requestProtectedAction(() => {
      setEditIndex(null);
      setNewProduct('');
      setNewCategory('Kuchyňa');
      setModalVisible(true);
    });
  };

  const handleSaveProduct = () => {
    if (!newProduct.trim()) return;

    let updated = [...items];

    if (editIndex !== null) {
      updated[editIndex].label =
        newProduct;
    } else {
      const categoryIndex =
        updated.findIndex(
          (i) =>
            i.type === 'header' &&
            i.label === newCategory
        );

      if (categoryIndex !== -1) {
        updated.splice(
          categoryIndex + 1,
          0,
          {
            type: 'item',
            label: newProduct,
          }
        );
      } else {
        updated.push({
          type: 'header',
          label: newCategory,
        });

        updated.push({
          type: 'item',
          label: newProduct,
        });
      }
    }

    setItems(updated);

    setModalVisible(false);

    setNewProduct('');
  };

  const handleDeleteProduct = (
    index
  ) => {
    Alert.alert(
      'Vymazať',
      'Chceš odstrániť produkt?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Vymazať',
          style: 'destructive',
          onPress: () => {
            const updated = [
              ...items,
            ];

            updated.splice(index, 1);

            setItems(updated);
          },
        },
      ]
    );
  };

  const handleEditProduct = (
    item,
    index
  ) => {
    setEditIndex(index);
    setNewProduct(item.label);
    setModalVisible(true);
  };

  const itemKeys = items
    .filter((it) => it.type === 'item')
    .map((it) => it.label);

  const nonZeroItems = itemKeys
    .filter(
      (key) =>
        values[key] &&
        values[key].trim() !== ''
    )
    .map((key) => `${key}: ${values[key]}`);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor,
      }}
    >
      <StatusBar barStyle="dark-content" />

      <View
        style={[
          styles.header,
          {
            paddingTop:
              insets.top + 14,
          },
        ]}
      >
        <View style={styles.headerRow}>
          <Text style={styles.screenTitle}>
            Odpad
          </Text>

          <View
            style={{
              flexDirection: 'row',
              position: 'absolute',
              right: 0,
            }}
          >
            <TouchableOpacity
              style={styles.addButton}
              onPress={openAddModal}
            >
              <Text
                style={
                  styles.addButtonText
                }
              >
                + Produkt
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.resetButton}
              onPress={handleResetAll}
            >
              <Text
                style={
                  styles.resetButtonText
                }
              >
                Reset
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{
          paddingBottom:
            insets.bottom + 220,
        }}
      >
        {items.map((item, index) => {
          if (item.type === 'header') {
            return (
              <View
                key={index}
                style={
                  styles.sectionHeader
                }
              >
                <View
                  style={
                    styles.sectionHeaderLine
                  }
                />

                <Text
                  style={
                    styles.sectionHeaderText
                  }
                >
                  {item.label}
                </Text>

                <View
                  style={
                    styles.sectionHeaderLine
                  }
                />
              </View>
            );
          }

          const key = item.label;

          const value =
            values[key] || '';

          const isEmpty =
            !value ||
            value.trim() === '';

          return (
            <View
              key={index}
              style={styles.itemRow}
            >
              <Text
                style={[
                  styles.itemLabel,
                  isEmpty &&
                    styles.itemLabelEmpty,
                ]}
              >
                {key}
              </Text>

              <View
                style={
                  styles.controlsContainer
                }
              >
                <TouchableOpacity
                  style={[
                    styles.btnSmall,
                    styles.btnMinus,
                  ]}
                  onPress={() =>
                    handleDecrement(key)
                  }
                >
                  <Text
                    style={
                      styles.btnSmallText
                    }
                  >
                    −
                  </Text>
                </TouchableOpacity>

                <TextInput
                  style={[
                    styles.valueInput,
                    !isEmpty &&
                      styles.valueInputActive,
                  ]}
                  value={value}
                  placeholder="0"
                  onChangeText={(text) =>
                    handleChangeValue(
                      key,
                      text
                    )
                  }
                  keyboardType="decimal-pad"
                />

                <TouchableOpacity
                  style={[
                    styles.btnSmall,
                    styles.btnPlus,
                  ]}
                  onPress={() =>
                    handleIncrement(key)
                  }
                >
                  <Text
                    style={
                      styles.btnSmallText
                    }
                  >
                    +
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </ScrollView>

      <View style={styles.manageContainer}>
        <Text style={styles.manageTitle}>
          Úprava produktov
        </Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={
            false
          }
        >
          {items
            .filter(
              (i) => i.type === 'item'
            )
            .map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.manageItem}
                onPress={() =>
                  requestProtectedAction(
                    () =>
                      handleEditProduct(
                        item,
                        items.findIndex(
                          (x) =>
                            x.label ===
                            item.label
                        )
                      )
                  )
                }
                onLongPress={() =>
                  requestProtectedAction(
                    () =>
                      handleDeleteProduct(
                        items.findIndex(
                          (x) =>
                            x.label ===
                            item.label
                        )
                      )
                  )
                }
              >
                <Text
                  style={
                    styles.manageText
                  }
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
        </ScrollView>

        <Text style={styles.manageHint}>
          Klik = upraviť •
          Podržať = vymazať
        </Text>
      </View>

      <View
        style={[
          styles.summaryFooter,
          {
            paddingBottom:
              insets.bottom + 12,
          },
        ]}
      >
        <Text style={styles.summaryLabel}>
          Položky:
        </Text>

        <ScrollView horizontal>
          {nonZeroItems.length > 0 ? (
            nonZeroItems.map(
              (item, idx) => (
                <View
                  key={idx}
                  style={
                    styles.summaryItem
                  }
                >
                  <Text
                    style={
                      styles.summaryItemText
                    }
                  >
                    {item}
                  </Text>
                </View>
              )
            )
          ) : (
            <Text
              style={
                styles.summaryEmptyText
              }
            >
              Žiadne položky
            </Text>
          )}
        </ScrollView>
      </View>

      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
      >
        <View style={styles.modalBg}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>
              {editIndex !== null
                ? 'Upraviť produkt'
                : 'Pridať produkt'}
            </Text>

            <TextInput
              placeholder="Názov produktu"
              value={newProduct}
              onChangeText={setNewProduct}
              style={styles.modalInput}
            />

            {editIndex === null && (
              <TextInput
                placeholder="Kategória"
                value={newCategory}
                onChangeText={
                  setNewCategory
                }
                style={styles.modalInput}
              />
            )}

            <TouchableOpacity
              style={styles.saveBtn}
              onPress={
                handleSaveProduct
              }
            >
              <Text
                style={
                  styles.saveBtnText
                }
              >
                Uložiť
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={() =>
                setModalVisible(false)
              }
            >
              <Text
                style={
                  styles.cancelBtnText
                }
              >
                Zavrieť
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        visible={passwordModalVisible}
        transparent
        animationType="fade"
      >
        <View style={styles.modalBg}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>
              Zadaj heslo
            </Text>

            <TextInput
              value={passwordInput}
              onChangeText={
                setPasswordInput
              }
              placeholder="Heslo"
              secureTextEntry
              keyboardType="number-pad"
              style={styles.modalInput}
            />

            <TouchableOpacity
              style={styles.saveBtn}
              onPress={verifyPassword}
            >
              <Text
                style={
                  styles.saveBtnText
                }
              >
                Potvrdiť
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={() =>
                setPasswordModalVisible(
                  false
                )
              }
            >
              <Text
                style={
                  styles.cancelBtnText
                }
              >
                Zrušiť
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <CounterScreen />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor,
    paddingHorizontal: 20,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },

  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },

  screenTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: textPrimary,
    textAlign: 'center',
  },

  addButton: {
    backgroundColor: '#dcfce7',
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 10,
    marginRight: 8,
  },

  addButtonText: {
    color: '#15803d',
    fontWeight: '700',
  },

  resetButton: {
    backgroundColor: '#fee2e2',
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 10,
  },

  resetButtonText: {
    color: '#dc2626',
    fontWeight: '700',
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 8,
  },

  sectionHeaderLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e5e7eb',
  },

  sectionHeaderText: {
    fontSize: 16,
    fontWeight: '900',
    color: textSecondary,
    paddingHorizontal: 12,
    textTransform: 'uppercase',
  },

  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:
      'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },

  itemLabel: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: textPrimary,
  },

  itemLabelEmpty: {
    color: '#9ca3af',
  },

  controlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  btnSmall: {
    width: 36,
    height: 40,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },

  btnMinus: {
    backgroundColor: '#fee2e2',
    borderColor: '#fca5a5',
  },

  btnPlus: {
    backgroundColor: '#dcfce7',
    borderColor: '#86efac',
  },

  btnSmallText: {
    fontSize: 18,
    fontWeight: '700',
  },

  valueInput: {
    width: 70,
    height: 40,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    textAlign: 'center',
    marginHorizontal: 6,
    backgroundColor: cardColor,
  },

  valueInputActive: {
    borderColor: accentColor,
    backgroundColor: '#eff6ff',
  },

  manageContainer: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 80,
    backgroundColor: '#fff',
  },

  manageTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 10,
    color: textPrimary,
  },

  manageItem: {
    backgroundColor: '#eef2ff',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
    marginRight: 10,
  },

  manageText: {
    color: '#3730a3',
    fontWeight: '700',
  },

  manageHint: {
    marginTop: 8,
    fontSize: 12,
    color: '#6b7280',
  },

  summaryFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: accentColor,
    paddingHorizontal: 16,
    paddingTop: 10,
  },

  summaryLabel: {
    color: '#dbeafe',
    marginBottom: 8,
    fontWeight: '700',
  },

  summaryItem: {
    backgroundColor:
      'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    marginRight: 8,
  },

  summaryItemText: {
    color: '#ffffff',
    fontWeight: '700',
  },

  summaryEmptyText: {
    color: '#bfdbfe',
  },

  modalBg: {
    flex: 1,
    backgroundColor:
      'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    padding: 20,
  },

  modalCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 20,
  },

  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 20,
  },

  modalInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 12,
    marginBottom: 14,
  },

  saveBtn: {
    backgroundColor: accentColor,
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },

  saveBtnText: {
    color: '#fff',
    fontWeight: '700',
  },

  cancelBtn: {
    padding: 12,
    alignItems: 'center',
  },

  cancelBtnText: {
    color: '#666',
  },
});