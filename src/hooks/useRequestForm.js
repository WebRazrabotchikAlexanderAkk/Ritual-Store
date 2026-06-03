import { useCallback, useEffect, useMemo, useState } from 'react';
import { requestConfig } from '../config/requestConfig.js';
import { useLocalStorage } from './useLocalStorage.js';

const emptyForm = {
  requestTypes: [],
  name: '',
  phoneMode: 'ru',
  phone: '',
  foreignPhone: '',
  city: '',
  cemeteryAddress: '',
  placeDescription: '',
  deadline: '',
  comment: '',
  agreement: false,
  selectedItemIds: [],
};

function snapshot(form) {
  return JSON.stringify({
    ...form,
    agreement: Boolean(form.agreement),
  });
}

export function useRequestForm(initialSelectedItems = []) {
  const [form, setForm] = useLocalStorage(requestConfig.storageKeys.form, emptyForm);
  const [submitStatus, setSubmitStatus] = useLocalStorage(requestConfig.storageKeys.submitStatus, null);
  const [selectedItems, setSelectedItems] = useLocalStorage(requestConfig.storageKeys.selectedItems, initialSelectedItems);
  const [photos, setPhotos] = useState([]);
  const currentSnapshot = useMemo(() => snapshot(form), [form]);

  useEffect(() => {
    if (initialSelectedItems.length && !selectedItems.length) {
      setSelectedItems(initialSelectedItems);
    }
  }, [initialSelectedItems, selectedItems.length, setSelectedItems]);

  const updateField = useCallback(
    (field, value) => {
      setForm((current) => ({ ...current, [field]: value }));
    },
    [setForm],
  );

  const toggleRequestType = useCallback(
    (type) => {
      setForm((current) => {
        const hasType = current.requestTypes.includes(type);
        return {
          ...current,
          requestTypes: hasType
            ? current.requestTypes.filter((item) => item !== type)
            : [...current.requestTypes, type],
        };
      });
    },
    [setForm],
  );

  const removeSelectedItem = useCallback(
    (id) => {
      setSelectedItems((current) => current.filter((item) => item.id !== id));
    },
    [setSelectedItems],
  );

  const markSubmitted = useCallback(() => {
    setSubmitStatus({
      hasSubmitted: true,
      submittedAt: new Date().toISOString(),
      lastSubmittedSnapshotHash: currentSnapshot,
      isSubmitDisabledUntilChange: true,
    });
  }, [currentSnapshot, setSubmitStatus]);

  const clearForm = useCallback(() => {
    setForm(emptyForm);
    setPhotos([]);
    setSubmitStatus(null);
  }, [setForm, setSubmitStatus]);

  const isSubmitDisabledUntilChange =
    submitStatus?.isSubmitDisabledUntilChange && submitStatus.lastSubmittedSnapshotHash === currentSnapshot;

  return {
    form,
    photos,
    selectedItems,
    submitStatus,
    isSubmitDisabledUntilChange,
    updateField,
    toggleRequestType,
    setPhotos,
    removeSelectedItem,
    markSubmitted,
    clearForm,
  };
}
