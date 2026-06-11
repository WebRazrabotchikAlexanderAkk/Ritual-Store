import { useEffect, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import MenuItem from '@mui/material/MenuItem';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import PhoneIcon from '@mui/icons-material/Phone';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SendIcon from '@mui/icons-material/Send';
import FormSection from '../../components/Form/FormSection.jsx';
import { requestConfig } from '../../config/requestConfig.js';
import { siteConfig } from '../../config/siteConfig.js';
import { notificationMessages } from '../../config/notificationMessages.js';
import { useAppContext } from '../../context/AppContext.jsx';
import { useRequestForm } from '../../hooks/useRequestForm.js';
import { validateImageFiles } from '../../utils/fileValidation.js';
import { formatRuPhone } from '../../utils/phoneFormat.js';
import { publicPath } from '../../utils/publicPath.js';
import { sendRequest } from '../../utils/requestSender.js';
import { isInsideWorkHours } from '../../utils/workHours.js';

const portraitOptions = [
  {
    value: 'engraving',
    label: 'Гравировка',
    description: 'портрет наносится на памятник гравировкой.',
  },
  {
    value: 'porcelain',
    label: 'Керамогранит',
    description: 'утопленная керамогранитная плита в памятнике.',
  },
];

export default function RequestPage() {
  const storedSelected = useMemo(() => {
    try {
      return JSON.parse(window.localStorage.getItem(requestConfig.storageKeys.selectedItems) || '[]');
    } catch {
      return [];
    }
  }, []);
  const request = useRequestForm(storedSelected);
  const { notify } = useAppContext();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      const hasFormData = Object.values(request.form).some((value) => {
        if (Array.isArray(value)) return value.length > 0;
        return Boolean(value);
      });

      if (hasFormData || request.photos.length) {
        event.preventDefault();
        event.returnValue = 'Вы заполняете заявку. Если уйти со страницы, прикреплённые фото могут быть потеряны.';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [request.form, request.photos.length]);

  const phoneValue = request.form.phoneMode === 'ru' ? request.form.phone : request.form.foreignPhone;
  const hasPhone = phoneValue.replace(/\D/g, '').length >= 6;
  const selectedPortrait = portraitOptions.find((option) => option.value === request.form.portraitType);

  const addFiles = (event) => {
    const result = validateImageFiles(event.target.files || []);
    if (result.errors.length) {
      notify(result.errors[0], 'error');
    }
    if (result.accepted.length) {
      request.setPhotos((current) => [...current, ...result.accepted].slice(0, requestConfig.maxFiles));
      notify(notificationMessages.fileAdded);
    }
    event.target.value = '';
  };

  const validateAndOpen = () => {
    if (!hasPhone) {
      notify(notificationMessages.phoneRequired, 'error');
      return;
    }
    if (!request.form.agreement) {
      notify(notificationMessages.agreementRequired, 'error');
      return;
    }
    setConfirmOpen(true);
  };

  const submit = async () => {
    setSending(true);
    await sendRequest({
      form: request.form,
      selectedItems: request.selectedItems,
      photoCount: request.photos.length,
      channels: requestConfig.channels,
    });
    request.markSubmitted();
    setConfirmOpen(false);
    setSending(false);
    notify(notificationMessages.requestSent);
  };

  const clear = () => {
    if (window.confirm('Очистить форму заявки?')) {
      request.clearForm();
    }
  };

  const newRequest = () => {
    if (window.confirm('Создать новую заявку? Текущие данные будут очищены.')) {
      request.clearForm();
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 5, md: 8 } }}>
      <Typography component="h1" variant="h2" sx={{ mb: 2 }}>
        Заявка на расчёт
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 4, fontSize: 18 }}>
        Оставьте телефон, выберите нужные услуги и приложите фото. Данные формы сохраняются в браузере, фото после
        обновления страницы нужно будет выбрать заново.
      </Typography>

      <Stack spacing={3}>
        {request.submitStatus?.hasSubmitted ? (
          <FormSection title="Спасибо, заявка отправлена">
            <Typography>
              Специалист свяжется с вами по указанному номеру для уточнения деталей.
            </Typography>
            <Typography color="text.secondary">
              Последняя отправка: {new Date(request.submitStatus.submittedAt).toLocaleString('ru-RU')}
            </Typography>
            <Typography color="text.secondary">{siteConfig.workSchedule}</Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
              <Button href={siteConfig.phoneHref} startIcon={<PhoneIcon />} variant="contained">
                Позвонить сейчас
              </Button>
              <Button onClick={newRequest} startIcon={<RestartAltIcon />} variant="outlined">
                Создать новую заявку
              </Button>
            </Stack>
          </FormSection>
        ) : null}

        <FormSection title="Тип обращения">
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {requestConfig.requestTypes.map((type) => (
              <Chip
                key={type}
                label={type}
                color={request.form.requestTypes.includes(type) ? 'primary' : 'default'}
                variant={request.form.requestTypes.includes(type) ? 'filled' : 'outlined'}
                onClick={() => request.toggleRequestType(type)}
                onDelete={request.form.requestTypes.includes(type) ? () => request.toggleRequestType(type) : undefined}
                deleteIcon={<span>Убрать</span>}
              />
            ))}
          </Stack>
        </FormSection>

        <FormSection title="Контактные данные">
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 2 }}>
            <TextField label="ФИО" value={request.form.name} onChange={(event) => request.updateField('name', event.target.value)} />
            <TextField label="В каком вы городе" value={request.form.city} onChange={(event) => request.updateField('city', event.target.value)} />
          </Box>
          <FormLabel>Телефон</FormLabel>
          <RadioGroup
            row
            value={request.form.phoneMode}
            onChange={(event) => request.updateField('phoneMode', event.target.value)}
          >
            <FormControlLabel value="ru" control={<Radio />} label="RU номер" />
            <FormControlLabel value="foreign" control={<Radio />} label="Другой" />
          </RadioGroup>
          {request.form.phoneMode === 'ru' ? (
            <TextField
              required
              label="+7 (999) 123-45-67"
              value={request.form.phone}
              onChange={(event) => request.updateField('phone', formatRuPhone(event.target.value))}
            />
          ) : (
            <TextField
              required
              label="Телефон"
              value={request.form.foreignPhone}
              onChange={(event) => request.updateField('foreignPhone', event.target.value)}
            />
          )}
        </FormSection>

        <FormSection title="Место работ">
          <TextField
            label="Адрес кладбища"
            value={request.form.cemeteryAddress}
            onChange={(event) => request.updateField('cemeteryAddress', event.target.value)}
          />
          <TextField
            label="Примерное описание места захоронения"
            multiline
            minRows={3}
            value={request.form.placeDescription}
            onChange={(event) => request.updateField('placeDescription', event.target.value)}
          />
          <Button component="label" variant="outlined">
            Прикрепить фото
            <input hidden type="file" accept="image/jpeg,image/png,image/webp,.heic,.heif" multiple onChange={addFiles} />
          </Button>
          <Typography color="text.secondary">Прикреплено фото: {request.photos.length}</Typography>
        </FormSection>

        <FormSection title="Портрет на памятнике">
          <FormLabel>Если нужен портрет, выберите способ оформления</FormLabel>
          <RadioGroup
            value={request.form.portraitType || ''}
            onChange={(event) => request.updateField('portraitType', event.target.value)}
          >
            {portraitOptions.map((option) => (
              <FormControlLabel
                key={option.value}
                value={option.value}
                control={<Radio />}
                label={
                  <Box>
                    <Typography component="span" fontWeight={700}>
                      {option.label}
                    </Typography>
                    <Typography component="span" display="block" color="text.secondary">
                      {option.description}
                    </Typography>
                  </Box>
                }
              />
            ))}
          </RadioGroup>
          <Typography color="text.secondary">
            Поле необязательное: можно оставить без выбора, если портрет не нужен или способ еще не согласован.
          </Typography>
        </FormSection>

        <FormSection title="Детали заказа">
          <TextField
            select
            label="Желаемый дедлайн"
            value={request.form.deadline}
            onChange={(event) => request.updateField('deadline', event.target.value)}
          >
            {['Без срочности', 'В течение месяца', 'К определенной дате', 'Нужна консультация'].map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Комментарий"
            multiline
            minRows={4}
            value={request.form.comment}
            onChange={(event) => request.updateField('comment', event.target.value)}
          />
        </FormSection>

        <FormSection title="Выбранные варианты">
          {request.selectedItems.length ? (
            <Stack spacing={1.5}>
              {request.selectedItems.map((item) => (
                <Chip key={item.id} label={item.title} onDelete={() => request.removeSelectedItem(item.id)} />
              ))}
            </Stack>
          ) : (
            <Typography color="text.secondary">Сюда попадут элементы, выбранные на странице избранного.</Typography>
          )}
        </FormSection>

        <FormSection title="Согласие">
          <FormControlLabel
            control={
              <Checkbox
                checked={request.form.agreement}
                onChange={(event) => request.updateField('agreement', event.target.checked)}
              />
            }
            label={
              <span>
                Я согласен на обработку персональных данных{' '}
                <a href={publicPath('/documents/personal-data-policy.pdf')} target="_blank" rel="noreferrer">
                  открыть политику
                </a>
              </span>
            }
          />
        </FormSection>

        {request.submitStatus?.hasSubmitted ? (
          <Typography color="text.secondary">
            Вы уже отправляли заявку. После повторной отправки прошлая заявка будет считаться неактуальной.
          </Typography>
        ) : null}

        {!isInsideWorkHours(siteConfig.workHours) ? (
          <Typography color="text.secondary">
            Заявку можно отправить сейчас. Специалист свяжется с вами в рабочее время: {siteConfig.workSchedule}.
          </Typography>
        ) : null}

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
          <Button
            onClick={validateAndOpen}
            startIcon={<SendIcon />}
            variant="contained"
            disabled={request.isSubmitDisabledUntilChange || sending}
          >
            Отправить заявку
          </Button>
          <Button onClick={clear} color="error" variant="outlined">
            Очистить форму заявки
          </Button>
        </Stack>
      </Stack>

      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Проверка заявки</DialogTitle>
        <DialogContent>
          <Stack spacing={1.2}>
            <Typography>Типы обращения: {request.form.requestTypes.join(', ') || 'не выбраны'}</Typography>
            <Typography>ФИО: {request.form.name || 'не указано'}</Typography>
            <Typography>Телефон: {phoneValue}</Typography>
            <Typography>Город: {request.form.city || 'не указан'}</Typography>
            <Typography>Адрес кладбища: {request.form.cemeteryAddress || 'не указан'}</Typography>
            {selectedPortrait ? <Typography>Портрет на памятнике: {selectedPortrait.label}</Typography> : null}
            <Typography>Дедлайн: {request.form.deadline || 'не указан'}</Typography>
            <Typography>Количество фото: {request.photos.length}</Typography>
            <Typography>Количество выбранных элементов: {request.selectedItems.length}</Typography>
            <Typography>Комментарий: {request.form.comment || 'нет'}</Typography>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Вернуться к редактированию</Button>
          <Button onClick={submit} variant="contained" disabled={sending}>
            Отправить заявку
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
